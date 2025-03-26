import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Timer as TimerIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
}));

const QuizCard = ({
  title,
  description,
  dueDate,
  status,
  score,
  totalQuestions,
}) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <AssignmentIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        {description}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <TimerIcon sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="body2" color="text.secondary">
          Due: {dueDate}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <EmojiEventsIcon sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="body2" color="text.secondary">
          {totalQuestions} questions
        </Typography>
      </Box>
      {score !== null && (
        <Typography variant="body2" color="primary">
          Score: {score}%
        </Typography>
      )}
    </CardContent>
    <CardActions>
      <Chip
        label={status}
        color={
          status === "Completed"
            ? "success"
            : status === "Pending"
            ? "warning"
            : "default"
        }
        size="small"
      />
    </CardActions>
  </Card>
);

const Homework = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);

  const quizzes = [
    {
      id: 1,
      title: "Algebra Basics Quiz",
      description: "Test your understanding of basic algebraic concepts",
      dueDate: "2024-03-20",
      status: "Completed",
      score: 95,
      totalQuestions: 10,
    },
    {
      id: 2,
      title: "Geometry Quiz",
      description: "Practice problems on triangles and circles",
      dueDate: "2024-03-25",
      status: "Pending",
      score: null,
      totalQuestions: 15,
    },
    {
      id: 3,
      title: "Calculus Quiz",
      description: "Derivatives and their applications",
      dueDate: "2024-03-30",
      status: "Not Started",
      score: null,
      totalQuestions: 12,
    },
  ];

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      searchQuery === "" ||
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateQuiz = () => {
    if (newQuizTitle.trim()) {
      // Add logic to create new quiz
      setOpenCreateDialog(false);
      setNewQuizTitle("");
      navigate("/create-quiz");
    }
  };

  const handleStartHomework = (homework) => {
    setSelectedHomework(homework);
  };

  const handleCloseDialog = () => {
    setSelectedHomework(null);
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Homework & Quizzes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Quiz
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search quizzes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredQuizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <QuizCard {...quiz} />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Create New Quiz</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quiz Title"
            fullWidth
            value={newQuizTitle}
            onChange={(e) => setNewQuizTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateQuiz} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!selectedHomework}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedHomework?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Subject: {selectedHomework?.subject}
          </Typography>
          <Typography variant="body1" paragraph>
            Duration: {selectedHomework?.duration}
          </Typography>
          <Typography variant="body1" paragraph>
            Due Date: {new Date(selectedHomework?.dueDate).toLocaleDateString()}
          </Typography>
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Start Homework
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Homework</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Title" fullWidth />
          <TextField margin="dense" label="Subject" fullWidth />
          <TextField margin="dense" label="Duration" fullWidth />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Homework;
