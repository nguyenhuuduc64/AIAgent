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
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  PlayCircle as PlayCircleIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
}));

const lectures = [
  {
    id: 1,
    title: "Introduction to Algebra",
    description: "Basic concepts and fundamentals of algebra",
    duration: "45 mins",
    completed: true,
    chapters: [
      {
        id: 1,
        title: "Variables and Expressions",
        duration: "15 mins",
        completed: true,
      },
      {
        id: 2,
        title: "Equations and Inequalities",
        duration: "15 mins",
        completed: true,
      },
      {
        id: 3,
        title: "Linear Functions",
        duration: "15 mins",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    title: "Geometry Basics",
    description: "Understanding shapes and spatial relationships",
    duration: "60 mins",
    completed: false,
    chapters: [
      {
        id: 1,
        title: "Points, Lines, and Planes",
        duration: "20 mins",
        completed: true,
      },
      {
        id: 2,
        title: "Angles and Triangles",
        duration: "20 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Polygons and Circles",
        duration: "20 mins",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Calculus Fundamentals",
    description: "Introduction to differential calculus",
    duration: "75 mins",
    completed: false,
    chapters: [
      {
        id: 1,
        title: "Limits and Continuity",
        duration: "25 mins",
        completed: false,
      },
      {
        id: 2,
        title: "Derivatives",
        duration: "25 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Applications of Derivatives",
        duration: "25 mins",
        completed: false,
      },
    ],
  },
];

const Lectures = () => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleCloseDialog = () => {
    setSelectedLecture(null);
    setOpenDialog(false);
  };

  const handleAddLecture = () => {
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" component="h1">
          Lectures
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddLecture}
        >
          Add Lecture
        </Button>
      </Box>

      <Grid container spacing={3}>
        {lectures.map((lecture) => (
          <Grid item xs={12} md={6} key={lecture.id}>
            <StyledPaper>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6" component="div">
                  {lecture.title}
                </Typography>
                <Chip
                  label={lecture.completed ? "Completed" : "In Progress"}
                  color={lecture.completed ? "success" : "primary"}
                  size="small"
                />
              </Box>
              <Typography color="text.secondary" paragraph>
                {lecture.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Duration: {lecture.duration}
              </Typography>
              <List>
                {lecture.chapters.map((chapter) => (
                  <React.Fragment key={chapter.id}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleLectureClick(lecture)}
                      >
                        <ListItemIcon>
                          {chapter.completed ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <RadioButtonUncheckedIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={chapter.title}
                          secondary={`Duration: ${chapter.duration}`}
                        />
                        <PlayCircleIcon color="primary" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedLecture}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedLecture?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {selectedLecture?.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Chapters:
          </Typography>
          <List>
            {selectedLecture?.chapters.map((chapter) => (
              <ListItem key={chapter.id}>
                <ListItemIcon>
                  {chapter.completed ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={chapter.title}
                  secondary={`Duration: ${chapter.duration}`}
                />
                <Button
                  variant="contained"
                  startIcon={<PlayCircleIcon />}
                  size="small"
                >
                  Watch
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Lecture</DialogTitle>
        <DialogContent>{/* Add form fields for new lecture */}</DialogContent>
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

export default Lectures;
