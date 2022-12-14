
let uav_status_started = false;
var uav_status_intervalId;

document.querySelector("#fetch-status-btn").addEventListener('click', async function ()
{
    try
    {
        if ( !uav_status_started )
        {
            uav_status_started = true;
            document.getElementById("fetch-status-btn").textContent = "Stop Logging";
            document.querySelector("#preview-uav-status").textContent = "Logging started. Waiting for data...";
            uav_status_intervalId = setInterval( async function()
            {
                try
                {
                    let text_data = await fetchUavStatus();
                    document.querySelector("#preview-uav-status").textContent = text_data;
                }
                catch (e)
                {
                    alert(e.message);
                    stopUavStatus();
                }

            }, 5000 );
        }
        else
        {
            stopUavStatus();
        }
    }
    catch (e)
    {
        alert(e.message);
        stopUavStatus();
    }
});

async function fetchUavStatus()
{
    let response = await fetch("uav-latest-status");

    if (!response.ok)
    {
        throw new Error("Server Error");
    }

    let text_data = await response.text();

    return text_data;
}

function stopUavStatus()
{
    uav_status_started = false;
    clearInterval(uav_status_intervalId);
    document.getElementById("fetch-status-btn").textContent = "Display UAV Status";
    document.querySelector("#preview-uav-status").textContent = "Logging stopped.";
}