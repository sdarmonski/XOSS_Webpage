
let logging_started = false;
var logging_intervalId;

document.querySelector("#fetch-log-btn").addEventListener('click', async function ()
{
    try
    {
        if ( !logging_started )
        {
            logging_started = true;
            document.getElementById("fetch-log-btn").textContent = "Stop Logging";
            document.querySelector("#preview-log").textContent = "Logging started. Waiting for data...";
            document.querySelector("#lte-latest-status").textContent = "Logging started. Waiting for data...";
            logging_intervalId = setInterval( async function()
            {
                try
                {
                    let text_data = await fetchLog();
                    document.querySelector("#preview-log").textContent = text_data;
                    text_data = await fetchLTElatestStatus();
                    document.querySelector("#lte-latest-status").textContent = text_data;
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

async function fetchLTElatestStatus()
{
    let response = await fetch("modem-latest-status");

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
    clearInterval(logging_intervalId);
    document.getElementById("fetch-log-btn").textContent = "Display Log";
    document.querySelector("#preview-log").textContent = "Logging stopped.";
    document.querySelector("#lte-latest-status").textContent = "Logging stopped.";
}
