<!DOCTYPE html>
<html>
<head>
    <title>Test page</title>
</head>
<body>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script>
        $.ajax("/data", {
            success: function(data) {
                document.write('<p>Check the dev console for the data!</p>');
                console.log(data);
            },
            method: "POST"
        });
    </script>
</body>
</html>