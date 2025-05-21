<?php
// SendGrid Configuration
define('SENDGRID_API_KEY', 'SG.xxxxxxxxxxxxxxxxxxxx'); // Replace with your API key from Twilio Console
define('FROM_EMAIL', 'ron23comia@gmail.com');
define('FROM_NAME', 'Forest Hills Garden');

// Email Recipients
define('RECIPIENTS', [
    'iamfeluna@yahoo.com',
    'ga_luna358@yahoo.com',
    'ron23comia@gmail.com'
]);

// Error Logging
define('ERROR_LOG_FILE', __DIR__ . '/contact_errors.log');

// File Upload Settings
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_FILE_TYPES', [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);
?> 