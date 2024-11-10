# Dialytics
#Team Meow Meow - Aditya Barad , Mayank Gongal 
MLH - Hack This Fall Virtual

**Dialytics** is a powerful mobile and web application solution designed to monitor and analyze call activity on company-provided mobile devices. The system enables businesses to capture call logs and recordings automatically, manage them securely, and gain valuable insights through advanced analytics.

---

## Problem Statement

In industries heavily reliant on telecommunication—such as customer service centers and sales teams—managing and monitoring call data is crucial for ensuring quality, adherence to company policies, and optimizing customer interactions. Current methods are either manual, expensive, or lack automation and insights into call quality. 

## Solution

Dialytics offers a comprehensive solution by:
1. **Collecting Call Logs and Recordings**: Automatically capturing call details (duration, timestamp, contact) and recording conversations for later analysis.
2. **Storing and Securing Data**: Uploading data to a secure cloud or database, ensuring privacy and compliance.
3. **Real-time Analytics and AI Integration**: Utilizing AI to transcribe, summarize, and analyze the sentiment of calls to provide actionable insights.
4. **Admin Web Panel**: Allowing authorized personnel to view, filter, and export call data, enhancing team productivity and quality control.

## Features

### Phase 1: Native Mobile App (Android)
- **Call Log Collection**: Automatically logs call details such as duration, timestamp, and contacts.
- **Call Recording**: Records all incoming and outgoing calls, saving them locally on the device.
- **Background Operation**: Runs seamlessly in the background without impacting performance.

### Phase 2: Web-based Admin Panel
- **Dashboard**: Provides a summary of call data, including call volume and total time spent on calls.
- **Call Log Visualization**: Displays detailed call logs with filtering options.
- **Call Playback and Export**: Allows playback and exporting of call data and recordings.
- **Role-based Access Control**: Ensures only authorized personnel can access sensitive data.

### Phase 3: AI-Powered Analytics
- **Speech-to-Text Conversion**: Converts recorded calls into text.
- **Call Summary Generation**: Automatically generates concise conversation summaries.
- **Sentiment Analysis**: Analyzes conversation tone (positive, negative, neutral) and highlights emotional sections.

---

## Tech Stack

| Area               | Technology                          |
|--------------------|-------------------------------------|
| **Mobile App**     | Flutter ,Kotlin (Android)           |
| **Frontend (Web)** | React, Vite                         |
| **Backend**        | Supabase, Auth0                     |
| **AI Processing**  | Gemini API                          |
| **CI/CD**          | Git, GitHub Actions                 |


## Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mayankgongal5/MLH-HTF-Meow-Meow-Dialytics
   cd MLH-HTF-Meow-Meow-Dialytics
