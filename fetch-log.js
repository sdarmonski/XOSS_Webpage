
let logging_started = false;
var intervalId;

document.querySelector("#fetch-log-btn").addEventListener('click', async function ()
{
    try
    {
        if ( !logging_started )
        {
            logging_started = true;
            document.getElementById("fetch-log-btn").textContent = "Stop Logging";
            document.querySelector("#preview-log").textContent = "Logging started. Waiting for data...";
            intervalId = setInterval( async function()
            {
                try
                {
                    let text_data = await fetchLog();
                    document.querySelector("#preview-log").textContent = text_data;
                }
                catch (e)
                {
                    alert(e.message);
                    stopLogging();
                }

            }, 5000 );
        }
        else
        {
            stopLogging();
        }
    }
    catch (e)
    {
        alert(e.message);
        stopLogging();
    }
});

async function fetchLog()
{
    var file = document.getElementById("log-select").value;
    if ( file === '0')
    {
        throw new Error("Select log file to display!");   
    }

    let response = await fetch(file);

    if (!response.ok)
    {
        throw new Error("Server Error");
    }

    let text_data = await response.text();

    return text_data;
}

function stopLogging()
{
    logging_started = false;
    clearInterval(intervalId);
    document.getElementById("fetch-log-btn").textContent = "Display Log";
    document.querySelector("#preview-log").textContent = "Logging stopped.";
}
