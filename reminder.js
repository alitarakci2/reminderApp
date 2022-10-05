const yeniGorev = document.querySelector(`.input-gorev`);
const yeniGorevEkleBtn = document.querySelector(`.btn-gorev-ekle`);
const gorevListesi = document.querySelector(`.gorev-listesi`);

yeniGorevEkleBtn.addEventListener(`click`,gorevEkle);
gorevListesi.addEventListener(`click`,gorevSilTamamla)
document.addEventListener(`DOMContentLoaded`, localStorageOku);
function gorevSilTamamla(e){
    const tiklanilanEleman = e.target;
    if(tiklanilanEleman.classList.contains(`gorev-btn-tamamlandi`)){
       
        tiklanilanEleman.parentElement.classList.toggle(`gorev-tamamlandi`);
    }
    if(tiklanilanEleman.classList.contains(`gorev-btn-sil`)){

    if(confirm(`Silmek istediginizden emin misiniz`)){

        tiklanilanEleman.parentElement.classList.toggle(`kaybol`);
        const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
        localStorageSil(silinecekGorev);

        tiklanilanEleman.parentElement.addEventListener(`transitionend`, function(){
            tiklanilanEleman.parentElement.remove();

        });

    }


    
        
  
    }
    
}

function gorevItemOlustur(gorev){
    const gorevDiv = document.createElement(`div`);
gorevDiv.classList.add(`gorev-item`);

const gorevLi = document.createElement(`li`);
gorevLi.classList.add(`gorev-tanim`);
gorevLi.innerText = gorev;
gorevDiv.appendChild(gorevLi);

const gorevTamamBtn = document.createElement(`button`);
gorevTamamBtn.classList.add(`gorev-btn`);
gorevTamamBtn.classList.add(`gorev-btn-tamamlandi`);
gorevTamamBtn.innerHTML = ` <i class="fa-solid fa-check"></i>`;
gorevDiv.appendChild(gorevTamamBtn);

const gorevSilBtn = document.createElement(`button`);
gorevSilBtn.classList.add(`gorev-btn`);
gorevSilBtn.classList.add(`gorev-btn-sil`);
gorevSilBtn.innerHTML = `<i class="fa-solid fa-delete-left"></i>`;
gorevDiv.appendChild(gorevSilBtn);




gorevListesi.appendChild(gorevDiv);
}

function gorevEkle(e){

    e.preventDefault();

    if(yeniGorev.value.length > 0){
        gorevItemOlustur(yeniGorev.value);
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = ``;

    }else{
        alert(`Bos gorev tanimi olamaz`);
    }

    

}

function localStorageArrayDonustur(){

    let gorevler;

    if(localStorage.getItem(`gorevler`) === null){
        gorevler = [];

    }else {
        gorevler = JSON.parse(localStorage.getItem(`gorevler`));
    }

    return gorevler;


}
function localStorageKaydet(yeniGorev){
    let gorevler = localStorageArrayDonustur();
    gorevler.push(yeniGorev);
    localStorage.setItem(`gorevler`, JSON.stringify(gorevler));
}

function localStorageOku(){

    let gorevler = localStorageArrayDonustur();

   

    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);


    });

 



}

function localStorageSil(gorev){
    let gorevler = localStorageArrayDonustur();



    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1);

    localStorage.setItem(`gorevler`, JSON.stringify(gorevler));
    

}