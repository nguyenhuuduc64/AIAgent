import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

// Sample quiz data (in a real app, this would come from an API)
const sampleQuiz = {
  id: 1,
  title: "Algebra Quiz 1",
  subject: "Algebra",
  duration: 30,
  questions: [
    {
      id: 1,
      question: "What is the value of x in the equation 2x + 5 = 13?",
      type: "multiple-choice",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      id: 2,
      question: "Simplify the expression: 3(x + 2) - 2x",
      type: "multiple-choice",
      options: ["x + 6", "x + 2", "3x + 6", "3x + 2"],
      correctAnswer: "x + 6",
    },
    {
      id: 3,
      question: "Solve the inequality: 2x - 4 > 6",
      type: "multiple-choice",
      options: ["x > 5", "x > 3", "x < 5", "x < 3"],
      correctAnswer: "x > 5",
    },
  ],
};

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // In a real app, fetch quiz data from an API
    setQuiz(sampleQuiz);
    setTimeLeft(sampleQuiz.duration * 60); // Convert minutes to seconds
  }, [id]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowSubmitDialog(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate results
    const score = quiz.questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    const percentage = (score / quiz.questions.length) * 100;

    setResults({
      score,
      total: quiz.questions.length,
      percentage,
    });

    setShowSubmitDialog(false);
    setShowResultsDialog(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!quiz) {
    return (
      <Container maxWidth="md">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {quiz.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            Subject: {quiz.subject}
          </Typography>
          <Typography variant="h6" color="primary">
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(currentQuestion / quiz.questions.length) * 100}
        sx={{ mb: 3 }}
      />

      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </Typography>
        <Typography variant="body1" paragraph>
          {quiz.questions[currentQuestion].question}
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            value={answers[quiz.questions[currentQuestion].id] || ""}
            onChange={(e) =>
              handleAnswerChange(
                quiz.questions[currentQuestion].id,
                e.target.value
              )
            }
          >
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </StyledPaper>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!answers[quiz.questions[currentQuestion].id]}
        >
          {currentQuestion === quiz.questions.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>

      <Dialog
        open={showSubmitDialog}
        onClose={() => setShowSubmitDialog(false)}
      >
        <DialogTitle>Submit Quiz</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your quiz? You cannot change your
            answers after submission.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showResultsDialog} onClose={() => navigate("/homework")}>
        <DialogTitle>Quiz Results</DialogTitle>
        <DialogContent>
          <Typography variant="h4" align="center" gutterBottom>
            {results.percentage}%
          </Typography>
          <Typography align="center">
            You scored {results.score} out of {results.total} questions
            correctly.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/homework")}>
            Back to Homework
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Quiz;
