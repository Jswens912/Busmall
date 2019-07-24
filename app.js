'use strict';

var maxVotes = 25;
var totalClicks = 0;
var lastViewed = [];
var allProducts = [];
var products = [
    {
        name: "bag",
        ext: "jpg",
        descripton: "r2d2 rolling suitcase",
        price: 54.99,
    },
    {
        name: "banana",
        ext: "jpg",
        descripton: "cuts up bananas",
        price: 4.99,
    },
    {
        name: "bathroom",
        ext: "jpg",
        descripton: "poop in style",
        price: 59.99,
    },
    {
        name: "boots",
        ext: "jpg",
        descripton: "breathable rain boots",
        price: 19.99,
    },
    {
        name: "breakfast",
        ext: "jpg",
        descripton: "all your breakfast in one go!",
        price: 34.99,
    },
    {
        name: "bubblegum",
        ext: "jpg",
        descripton: "Leaves your breath meaty fresh!",
        price: 3.99,
    },
    {
        name: "chair",
        ext: "jpg",
        descripton: "the comfiest chair around!",
        price: 49.99,
    },
    {
        name: "cthulhu",
        ext: "jpg",
        descripton: "Bow before your overlord.",
        price: 14.99,
    },
    {
        name: "dog-duck",
        ext: "jpg",
        descripton: "make your neighbors think you have a pet duck!",
        price: 11.99,
    },
    {
        name: "dragon",
        ext: "jpg",
        descripton: "Authentic dragon meat!",
        price: 3.99,
    },
    {
        name: "pen",
        ext: "jpg",
        descripton: "extremely useful pens!",
        price: 4.99,
    },
    {
        name: "pet-sweep",
        ext: "jpg",
        descripton: "Finally, a use for your pet!",
        price: 19.99,
    },
    {
        name: "scissors",
        ext: "jpg",
        descripton: "A cut above the rest!",
        price: 7.99,
    },
    {
        name: "shark",
        ext: "jpg",
        descripton: "the comfiest shark bite you'll ever experience!",
        price: 74.99,
    },
    {
        name: "sweep",
        ext: "png",
        descripton: "Time for your baby to earn their keep",
        price: 34.99,
    },
    {
        name: "tauntaun",
        ext: "jpg",
        descripton: "It's still warm!",
        price: 64.99,
    },
    {
        name: "unicorn",
        ext: "jpg",
        descripton: "They really do exist, and they're delicious!",
        price: 9.99,
    },
    {
        name: "usb",
        ext: "gif",
        descripton: "Mmmmm wiggly!",
        price: 24.99,
    },
    {
        name: "water-can",
        ext: "jpg",
        descripton: "We swear it works!",
        price: 12.99,
    },
    {
        name: "wine-glass",
        ext: "jpg",
        descripton: "almost spill proof!",
        price: 11.99,
    },
];



function createProducts() {
    for(var i = 0; i < products.length; i++){
      new Product(products[i].name,products[i].ext);
    }
    console.table(allProducts);
  };

function randomImages (){
    var imgIndex = Math.floor(Math.random()*allProducts.length);
    return imgIndex;
}

function Product(name, extension){
    this.name = name;
    this.image = "../images/" + name + "." + extension;
    this.clicks = 0;
    this.views = 0;
    
    allProducts.push(this);
};


function render() {
    var productSection = document.getElementById ("products");
    productSection.innerHTML = '';


    var randomProducts = [];
    randomProducts.push(allProducts[randomImages()]);
    randomProducts.push(allProducts[randomImages()]);
        while(randomProducts[0] === randomProducts[1]){
         randomProducts[1] = allProducts[randomImages()];
          }
    randomProducts.push(allProducts[randomImages()]);
        while(randomProducts[2] === randomProducts[0] || randomProducts[2] === randomProducts[1]){
            randomProducts[2] = allProducts[randomImages()];
          }
    for(var i = 0; i < randomProducts.length; i++){
        randomProducts[i].views++;
        var img = document.createElement('img');
        img.setAttribute('src', randomProducts[i].image);
        img.setAttribute('data-name', randomProducts[i].name);
        img.addEventListener('click', handleEvent);
        productSection.appendChild(img);
    };
};

function handleEvent(event){
    var productName = event.target.dataset.name;
    for(var i = 0; i < allProducts.length; i++){
        if (allProducts[i].name === productName){
            allProducts[i].clicks++;
            totalClicks++;
            render();
        };
    };
    if(totalClicks === 25){
        var imgs = document.getElementsByTagName('img');
        for(i = 0; i < imgs.length; i++){
            imgs[i].removeEventListener('click', handleEvent);
        };
        displayResults();
    };
};


function createChart(ctx,labels,dataLabel,data){
var ctx = document.getElementById('myChart');
var canvas = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}
function displayResults(){
    //var products = document.getElementById("products");
    //products.innerHTML= '';
   var canvas = document.createElement("canvas");
   canvas.id="canvas";
   var ctx2d = canvas.getContext("2d");
   var labels =[];
   var data = [];
   for(var i = 0; i < allProducts.length; i++){
    labels.push(allProducts[i].name);
    data.push(allProducts[i].clicks);
   }
   createChart(ctx2d,labels,"Votes",data);
   var results = document.getElementById("results");
   results.appendChild("myChart");

};
function saveResults(){
   
    localStorage.setItem("allProducts", JSON.stringify(allProducts))
    console.log(localStorage.allProducts);
}

createProducts();
render();
saveResults();