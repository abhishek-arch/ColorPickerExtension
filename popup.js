const btn = document.querySelector('.changeColorBtn');
const colorgrid=document.querySelector('.colorgrid');
const colorvalue=document.querySelector('.colorvalue'); 

btn.addEventListener('click', async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    },
    async (injectionResults) => {
        const [data]= injectionResults;
        if(data.result){
            const color = data.result.sRGBHex;
            colorgrid.style.backgroundColor=color;
            colorvalue.textContent=color;

            try
            {
                await navigator.clipboard.writeText(color);


            }
            catch(e){
                console.error(e);            }
            
        }

        

    }

);



});

async function pickColor() {
    try{
        const eyeDropper = new EyeDropper();
         return await eyeDropper.open();
    }
    catch(e){
        console.error(e);
    }
  

   
}