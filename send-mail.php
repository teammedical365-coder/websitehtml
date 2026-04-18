<?php
/**
 * Medical365 - Professional Lead Routing System
 * Targets: TEAMMEDICAL365@GMAIL.COM
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Destination
    $to = "TEAMMEDICAL365@GMAIL.COM";
    
    // 2. Identify Form Source
    $inquiry_topic = isset($_POST['inquiry_topic']) ? $_POST['inquiry_topic'] : "General Inquiry";
    $form_type = isset($_POST['challenges']) ? "Book Demo Request" : "Contact Us Message";
    
    $subject = "New Medical365 Lead: " . $form_type . " [" . $inquiry_topic . "]";

    // 3. Collect Data
    $first_name = strip_tags(trim($_POST["first_name"]));
    $last_name = strip_tags(trim($_POST["last_name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone_number"]));
    $org = strip_tags(trim($_POST["organization_name"]));
    $msg = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : "";
    $challenges = isset($_POST["challenges"]) ? strip_tags(trim($_POST["challenges"])) : "";
    $fac_type = isset($_POST["facility_type"]) ? $_POST["facility_type"] : "N/A";
    $beds = isset($_POST["bed_count"]) ? $_POST["bed_count"] : "N/A";

    // 4. Build Email Content
    $email_content = "You have a new inquiry from the Medical365 Website.\n\n";
    $email_content .= "--- PERSONAL DETAILS ---\n";
    $email_content .= "Name: $first_name $last_name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    
    $email_content .= "--- ORGANIZATION DETAILS ---\n";
    $email_content .= "Organization: $org\n";
    $email_content .= "Facility Type: $fac_type\n";
    $email_content .= "Bed/Doctor Count: $beds\n\n";
    
    if (!empty($inquiry_topic)) {
        $email_content .= "--- TOPIC ---\n";
        $email_content .= "Interest: $inquiry_topic\n\n";
    }

    if (!empty($msg)) {
        $email_content .= "--- MESSAGE ---\n";
        $email_content .= "$msg\n\n";
    }

    if (!empty($challenges)) {
        $email_content .= "--- CHALLENGES ---\n";
        $email_content .= "$challenges\n\n";
    }

    $email_content .= "--- METADATA ---\n";
    $email_content .= "Submitted from: " . $_SERVER['HTTP_REFERER'] . "\n";
    $email_content .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

    // 5. Build Email Headers
    $headers = "From: Medical365 Web <noreply@medical365.in>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 6. Send Email
    $success = mail($to, $subject, $email_content, $headers);

    // 7. Response
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        // AJAX Request
        if ($success) {
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Mail server failed to send."]);
        }
    } else {
        // Standard POST Request
        if ($success) {
            header("Location: thank-you.html");
            exit;
        } else {
            echo "<h1>Something went wrong.</h1><p>Please contact us directly at $to</p>";
        }
    }
} else {
    // Not a POST request
    header("Location: index.html");
    exit;
}
?>
