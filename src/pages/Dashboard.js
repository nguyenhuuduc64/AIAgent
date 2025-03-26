import React from "react";
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
  Divider,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
}));

const StatCard = ({ title, value, icon, color }) => (
  <StyledPaper>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: `${color}15`,
          color: color,
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </Box>
    </Box>
  </StyledPaper>
);

const Dashboard = () => {
  const stats = [
    {
      title: "Average Score",
      value: "92%",
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      color: "#4CAF50",
    },
    {
      title: "Completed Quizzes",
      value: "24",
      icon: <EmojiEventsIcon sx={{ fontSize: 32 }} />,
      color: "#2196F3",
    },
    {
      title: "Study Hours",
      value: "48",
      icon: <TimerIcon sx={{ fontSize: 32 }} />,
      color: "#FF9800",
    },
    {
      title: "Courses in Progress",
      value: "4",
      icon: <SchoolIcon sx={{ fontSize: 32 }} />,
      color: "#9C27B0",
    },
  ];

  const recentActivities = [
    {
      title: "Completed Algebra Quiz",
      description: "Scored 95% on Chapter 3 Quiz",
      time: "2 hours ago",
    },
    {
      title: "Started Geometry Course",
      description: "Began learning about triangles",
      time: "5 hours ago",
    },
    {
      title: "Submitted Homework",
      description: "Completed Calculus assignment",
      time: "1 day ago",
    },
    {
      title: "Watched Lecture",
      description: "Completed Statistics lecture 2",
      time: "2 days ago",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {activity.description}
                          </Typography>
                          {" — "}
                          {activity.time}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Upcoming Tasks
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Complete Geometry Quiz"
                  secondary="Due in 2 days"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Submit Calculus Assignment"
                  secondary="Due in 3 days"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Watch Statistics Lecture"
                  secondary="Due in 4 days"
                />
              </ListItem>
            </List>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
