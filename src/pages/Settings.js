import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    newCourses: false,
    darkMode: false,
    name: "John Doe",
    email: "john.doe@example.com",
    language: "English",
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle saving settings
    console.log("Saving settings:", settings);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 2 }}
            alt={settings.name}
            src="/path-to-avatar.jpg"
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{ ml: 2 }}
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCameraIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={settings.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={settings.language}
              onChange={handleInputChange}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
          }
          label="Email Notifications"
        />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          control={
            <Switch
              checked={settings.courseUpdates}
              onChange={() => handleToggle("courseUpdates")}
            />
          }
          label="Course Updates"
        />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          control={
            <Switch
              checked={settings.newCourses}
              onChange={() => handleToggle("newCourses")}
            />
          }
          label="New Course Announcements"
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
            />
          }
          label="Dark Mode"
        />
      </Paper>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
