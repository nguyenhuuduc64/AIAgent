import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const QuestionCard = ({ question, index, onUpdate, onDelete }) => (
  <StyledPaper>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h6">Question {index + 1}</Typography>
      <IconButton onClick={() => onDelete(index)} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
    <TextField
      fullWidth
      label="Question Text"
      value={question.text}
      onChange={(e) => onUpdate(index, "text", e.target.value)}
      multiline
      rows={2}
      sx={{ mb: 2 }}
    />
    <FormControl component="fieldset">
      <FormLabel>Options</FormLabel>
      <RadioGroup value={question.correctAnswer}>
        {["A", "B", "C", "D"].map((option) => (
          <Box
            key={option}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <FormControlLabel
              value={option}
              control={<Radio />}
              label=""
              onChange={() => onUpdate(index, "correctAnswer", option)}
            />
            <TextField
              fullWidth
              label={`Option ${option}`}
              value={question.options[option]}
              onChange={(e) =>
                onUpdate(index, "options", {
                  ...question.options,
                  [option]: e.target.value,
                })
              }
              size="small"
            />
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  </StyledPaper>
);

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    subject: "",
    duration: "",
    questions: [],
  });

  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    type: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleAddQuestion = () => {
    setCurrentQuestion({
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setOpenQuestionDialog(true);
  };

  const handleSaveQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, currentQuestion],
    }));
    setOpenQuestionDialog(false);
  };

  const handleDeleteQuestion = (index) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleEditQuestion = (index) => {
    setCurrentQuestion(quiz.questions[index]);
    setOpenQuestionDialog(true);
  };

  const handleSaveQuiz = () => {
    // Add logic to save quiz
    console.log("Saving quiz:", quiz);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Quiz
      </Typography>

      <StyledPaper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Quiz Title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Subject"
              value={quiz.subject}
              onChange={(e) => setQuiz({ ...quiz, subject: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={quiz.duration}
              onChange={(e) => setQuiz({ ...quiz, duration: e.target.value })}
            />
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Questions</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>
        </Box>

        <List>
          {quiz.questions.map((question, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`Question ${index + 1}`}
                  secondary={question.question}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditQuestion(index)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </StyledPaper>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveQuiz}
          disabled={quiz.questions.length === 0}
        >
          Save Quiz
        </Button>
      </Box>

      <Dialog
        open={openQuestionDialog}
        onClose={() => setOpenQuestionDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Question Type</InputLabel>
            <Select
              value={currentQuestion.type}
              label="Question Type"
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  type: e.target.value,
                })
              }
            >
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
              <MenuItem value="true-false">True/False</MenuItem>
              <MenuItem value="short-answer">Short Answer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Question"
            multiline
            rows={3}
            value={currentQuestion.question}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                question: e.target.value,
              })
            }
            sx={{ mt: 2 }}
          />

          {currentQuestion.type === "multiple-choice" && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Options
              </Typography>
              {currentQuestion.options.map((option, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options];
                    newOptions[index] = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: newOptions,
                    });
                  }}
                  sx={{ mb: 1 }}
                />
              ))}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Correct Answer</InputLabel>
                <Select
                  value={currentQuestion.correctAnswer}
                  label="Correct Answer"
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: e.target.value,
                    })
                  }
                >
                  {currentQuestion.options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQuestionDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveQuestion}>
            Save Question
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateQuiz;
