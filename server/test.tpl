<!DOCTYPE html>
<html>
<head>
    <title>Test page</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
</head>
<body>
    <!-- <form action="/data" method="get">
        <label for="page_title">Page title:</label>
        <input type="text" id="page_title" name="page_title">
        <input type="button" value="Send!" id="submit_btn">
    </form> -->
    <p>Test page</p>
    <script>
        var name = prompt("Type in the name of your page");
        $.ajax("/data", {
            success: function(data) {
                $('body').append('<p>Images: '+data.imageCount+', links: '+data.linkCount+
                    ', references: '+data.refCount+'</p>');
                console.log(data);
            },
            data: {
                page_title: name || "doge" //" 'doge' as the default value to stop this breaking"
            }
        });
    </script>
</body>
</html>