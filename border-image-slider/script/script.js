//render image
for(let i=0; i<54; i++)
{
	let parent = document.getElementsByClassName("image-content");
	let child = document.createElement("img");
	child.className = "img";
	parent[0].appendChild(child);
	let image = document.getElementsByClassName("img");
	image[i].src = "images/" + (i + 1) + ".jpg";
	image[i].style.opacity = 0;
}
//dinamically responsive
var totalImage = 0;
window.onresize = imageFrameGenerator;
window.onload = imageFrameGenerator;

function imageFrameGenerator() {
	let windowWidth = window.innerWidth;
	let imageOnWidth = windowWidth > 1100 ? 10 : windowWidth > 800 ? 9 : windowWidth > 600 ? 8 : 7;

	let imageSize = windowWidth / imageOnWidth;

	//Set text content width
	let contentWidth = (imageOnWidth - 2) * imageSize;
    let content = document.getElementsByClassName("text-content");
    content[0].style.position = "absolute";
    content[0].style.top = imageSize + "px";
    content[0].style.left = imageSize + "px";
    content[0].style.width = contentWidth - 60 + "px";

    //fix text content height
    content[0].style.height = "auto";
    let contentHeight = content[0].offsetHeight;
    let imageOnHeight = Math.ceil(contentHeight / imageSize);
    content[0].style.height = (imageOnHeight*imageSize) - 60 + "px";

    //let image aroung text
    totalImage = 2 * imageOnWidth + 2 * imageOnHeight;
	for(let i=0, j=1, k=0; i < totalImage; i++)
    {
    	let image = document.getElementsByClassName("img");
        image[i].style.position = "absolute";
        image[i].style.width = imageSize + "px";
        image[i].style.opacity = 1;
        image[i].dataset.index = i;
    	if(i < imageOnWidth)
    	{
    		image[i].style.top = 0 + "px";
        	image[i].style.left = i * imageSize + "px";
        	k = i;
    	}
    	else if( i < imageOnWidth + imageOnHeight)
    	{
    		image[i].style.top = j++ * imageSize + "px";
        	image[i].style.left = k * imageSize + "px";
    	}
    	else if( i < 2*imageOnWidth + imageOnHeight)
    	{
			image[i].style.top = j * imageSize + "px";
        	image[i].style.left = k-- * imageSize + "px";
    	}
    	else
    	{
    		image[i].style.top = --j * imageSize + "px";
        	image[i].style.left = 0 + "px";
    	}        
    }
    //hide unused image
    for(let i = totalImage; i < 54; i++)
    	document.getElementsByClassName("img")[i].style.opacity = 0;
};
//animation
setInterval(frame, 1400);
function frame()
{
    let image1, image2;
    let random = Math.floor(Math.random() * (totalImage-1) );
    let image = document.getElementsByClassName("img");
    for (let i = 0; i < totalImage; i++)
    {
        if(image[i].dataset.index == random.toString())
            image1 = image[i];
        else if (image[i].dataset.index == (random + 1).toString() )
            image2 = image[i];
    }
    [image1.style.top, image2.style.top] = [image2.style.top, image1.style.top];
    [image1.style.left, image2.style.left] = [image2.style.left, image1.style.left];
    [image1.dataset.index, image2.dataset.index] = [image2.dataset.index, image1.dataset.index];
    image1.style.transition = "all 1s";
    image2.style.transition = "all 1s";
}
//control transition on resize
(function() { 
    const classes = document.body.classList;
    let timer = 0;
    window.addEventListener('resize', function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        else
            classes.add('transition-control');

        timer = setTimeout(() => {
            classes.remove('transition-control');
            timer = null;
        }, 100);
    });
})();
