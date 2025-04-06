<?php
/**
 * CurioLabs Contact Form Handler
 * 
 * This script processes the contact form submission and sends an email.
 * Place this file on your server and update the form action in the HTML to point to it.
 */

// Configuration
$recipientEmail = 'kwameagain@icloud.com';  // Change to your email address
$emailSubject = 'New Contact Form Submission from CurioLabs Website';
$successRedirect = 'contact.html?status=success';
$errorRedirect = 'contact.html?status=error';

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    $newsletter = isset($_POST['newsletter']) ? 'Yes' : 'No';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        redirectWithError('All required fields must be filled out.');
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        redirectWithError('Invalid email format.');
    }
    
    // Prepare email content
    $emailBody = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #2b59ff; }
            .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .info-table td { padding: 10px; border-bottom: 1px solid #eee; }
            .info-table td:first-child { font-weight: bold; width: 150px; }
            .message-box { background-color: #f7f9fc; padding: 15px; border-radius: 5px; margin-top: 20px; }
            .footer { margin-top: 30px; font-size: 12px; color: #888; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>New Contact Form Submission</h1>
            <p>You have received a new message from the CurioLabs website contact form.</p>
            
            <table class='info-table'>
                <tr>
                    <td>Name:</td>
                    <td>" . htmlspecialchars($name) . "</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>" . htmlspecialchars($email) . "</td>
                </tr>";
    
    if (!empty($phone)) {
        $emailBody .= "
                <tr>
                    <td>Phone:</td>
                    <td>" . htmlspecialchars($phone) . "</td>
                </tr>";
    }
    
    $emailBody .= "
                <tr>
                    <td>Subject:</td>
                    <td>" . htmlspecialchars($subject) . "</td>
                </tr>
                <tr>
                    <td>Newsletter Subscription:</td>
                    <td>" . ($newsletter == 'Yes' ? 'Yes - Please add to mailing list' : 'No') . "</td>
                </tr>
                <tr>
                    <td>Date/Time:</td>
                    <td>" . date('F j, Y, g:i a') . "</td>
                </tr>
                <tr>
                    <td>IP Address:</td>
                    <td>" . $_SERVER['REMOTE_ADDR'] . "</td>
                </tr>
            </table>
            
            <div class='message-box'>
                <p><strong>Message:</strong></p>
                <p>" . nl2br(htmlspecialchars($message)) . "</p>
            </div>
            
            <div class='footer'>
                <p>This email was sent from the CurioLabs website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "From: CurioLabs Website <noreply@curiolabs.dev>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Send email
    if (mail($recipientEmail, $emailSubject, $emailBody, $headers)) {
        // Success - redirect with success status
        header("Location: $successRedirect");
        exit;
    } else {
        // Error - redirect with error status
        redirectWithError('Failed to send email. Please try again later.');
    }
} else {
    // Not a POST request
    header("Location: contact.html");
    exit;
}

/**
 * Redirect with error message
 * 
 * @param string $errorMessage Error message to display
 */
function redirectWithError($errorMessage) {
    global $errorRedirect;
    $encodedError = urlencode($errorMessage);
    header("Location: $errorRedirect&message=$encodedError");
    exit;
}

// At the end, add JSON response for AJAX requests
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if (mail($recipientEmail, $emailSubject, $emailBody, $headers)) {
      echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
    } else {
      http_response_code(500);
      echo json_encode(['status' => 'error', 'message' => 'Failed to send email']);
    }
    exit;
  }
  ?>