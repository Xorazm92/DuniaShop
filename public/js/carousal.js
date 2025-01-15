const reviews=[
    {
        name:"Sabrbek Jamol o'g'li",
        reviews:"Salom, men Sabrbekman, Toshkentdan! Yangi charm rukzagimni oldim va aynan men qidirayotgan narsa ekan! Juda yoqdi! Sizlarning mahsulotlaringiz ajoyib! Raya Duniaga katta rahmat."
    },
    {
        name:"Toxir Abdullayev",
        reviews:"Yaqinda ulardan kurtka sotib oldim va sifati hamda xizmati meni qoniqtirdi. Tikish sifati, charm materiali, hammasi juda yaxshi. Sizlar zo'rsizlar!"
    }, {
        name:"Samandar Murodov",
        reviews:"Bugun sumkamni oldim. Rahmat. Bunday tez xizmatni kutmagandim va bu hafta oxirida sumkani ishlatish imkoniyati bo'lganidan juda xursandman. Yelka tasmalari juda qulay. Yana bir bor rahmat. Men sumkalarga juda qiziqaman va shuni aytishim kerakki, sizlardan sotib olgan sumkalarimdan bunday mamnun bo'lmaganman. Ular shunchaki mukammal."
    }
];
const Name=document.querySelector(".test_box h4");
const Review=document.querySelector(".test_box p");
const btn=document.getElementsByClassName("next-circle");

let i=0;
setInterval(myTimer, 2000);
const reviewName=document.querySelector(".test_box");
function myTimer() {
    Name.textContent=reviews[i%3].name;
    Review.textContent=reviews[i%3].reviews;
    btn[i%3].style.backgroundColor="black";
    btn[(i+1)%3].style.backgroundColor="#ff8aa5";
    btn[(i+2)%3].style.backgroundColor="#ff8aa5";


    i++;

}
