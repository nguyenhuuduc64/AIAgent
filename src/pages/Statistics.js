import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  Timeline as TimelineIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const statsData = {
  overview: [
    {
      title: "Enrolled Courses",
      value: "4",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: "#2196F3",
    },
    {
      title: "Total Hours",
      value: "207",
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      color: "#4CAF50",
    },
    {
      title: "Completed Courses",
      value: "1",
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      color: "#FF9800",
    },
    {
      title: "Average Progress",
      value: "37.5%",
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: "#F44336",
    },
  ],
  courseProgress: [
    {
      course: "HTML CSS Pro",
      progress: 45,
      totalHours: 116.5,
      completedHours: 52.4,
    },
    {
      course: "JavaScript Pro",
      progress: 30,
      totalHours: 36.1,
      completedHours: 10.8,
    },
    {
      course: "Ngôn ngữ Sass",
      progress: 75,
      totalHours: 6.3,
      completedHours: 4.7,
    },
    {
      course: "React Pro",
      progress: 15,
      totalHours: 48.3,
      completedHours: 7.2,
    },
  ],
};

const Statistics = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Learning Statistics
      </Typography>

      <Grid container spacing={3}>
        {statsData.overview.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: `${stat.color}15`,
                  color: stat.color,
                  margin: "0 auto 16px",
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h4" gutterBottom>
                {stat.value}
              </Typography>
              <Typography color="text.secondary">{stat.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
        Course Progress
      </Typography>

      <Grid container spacing={3}>
        {statsData.courseProgress.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="h6">{course.course}</Typography>
                <Typography color="primary">{course.progress}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={course.progress}
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  {course.completedHours} hours completed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.totalHours} total hours
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Statistics;
