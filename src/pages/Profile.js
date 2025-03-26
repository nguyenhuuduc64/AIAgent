import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
}));

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Student",
    notifications: {
      email: true,
      quizReminders: true,
      courseUpdates: false,
    },
    language: "English",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (setting) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting],
      },
    }));
  };

  const handleSave = () => {
    // Add logic to save profile changes
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const stats = [
    {
      title: "Completed Quizzes",
      value: "12",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: "#2196F3",
    },
    {
      title: "Average Score",
      value: "92%",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: "#4CAF50",
    },
    {
      title: "Study Hours",
      value: "48",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: "#FF9800",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  mb: 2,
                }}
                alt={profile.name}
                src="/static/images/avatar/1.jpg"
              />
              <Typography variant="h5" gutterBottom>
                {profile.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {profile.role}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(!isEditing)}
                sx={{ mt: 2 }}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={profile.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Role" secondary={profile.role} />
              </ListItem>
            </List>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <StyledPaper>
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: `${stat.color}15`,
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
                  </Box>
                </StyledPaper>
              </Grid>
            ))}

            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom>
                  Profile Settings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Language"
                      name="language"
                      value={profile.language}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={profile.notifications.email}
                      onChange={() => handleNotificationChange("email")}
                      disabled={!isEditing}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={profile.notifications.quizReminders}
                      onChange={() => handleNotificationChange("quizReminders")}
                      disabled={!isEditing}
                    />
                  }
                  label="Quiz Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={profile.notifications.courseUpdates}
                      onChange={() => handleNotificationChange("courseUpdates")}
                      disabled={!isEditing}
                    />
                  }
                  label="Course Updates"
                />

                {isEditing && (
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </StyledPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
