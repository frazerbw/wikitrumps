<!DOCTYPE html>
<html>
<head>
    <title>Test page</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
</head>
<body>
    <form action="/data" method="get">
        <label for="page_title">Page title:</label>
        <input type="text" id="page_title" name="page_title">
        <input type="button" value="Send!" id="submit_btn">
    </form>
    <script>
        $(document).ready(function() {
            $("#submit_btn").click(function() {
                $.ajax("/data", {
                    success: function(data) {
                        document.write('<p>Images: '+data.imageCount+', links: '+data.linkCount+'</p>');
                    }
                });
            });
        });
    </script>
</body>
</html>