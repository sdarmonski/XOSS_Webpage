let suggestions = [
    "network-watchdog",
    "modem-watchdog" ];

for (var i = 0; i < suggestions.length; i++)
{
    var opt = suggestions[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    document.getElementById("log-select").appendChild(el);
}