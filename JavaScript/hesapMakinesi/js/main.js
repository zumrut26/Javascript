function addValueToCalculateArea(value) {//fonksiyonu yani işlemi, hesaplama alanına değer eklemek olacak.bu yüzden parantez içinde değeri belirtiyoruz.
    var calculateArea = document.getElementById("calculate-area");//variable ı yani değişkeni hesaplama alnına uygulayacağız.bu yüzden atama operatörüyle belge içerisindeki idyi getiriyoruz. 
    calculateArea.value = calculateArea.value + value;//hesaplama alanına bir değer atanacağı belirlenmiştir.
}

function calculate() {//hesaplama adında bir fonksiyon açıldı.
    var calculateArea = document.getElementById("calculate-area");//hesaplama alanı adındaki değişkene belge içerisinden idsi hesaplama alanı adında bir element atandı.
    var artiMi = calculateArea.value.indexOf("+");//indexOf: verilen artı değerinin hangi indexte olduğunu döndürür, eğer yok ise -1 döndürür.
    var eksiMi = calculateArea.value.indexOf("-");//indexOf: verilen eksi değerinin hangi indexte olduğunu döndürür, eğer yok ise -1 döndürür.
    var carpiMi = calculateArea.value.indexOf("*");//indexOf: verilen çarpı değerinin hangi indexte olduğunu döndürür, eğer yok ise -1 döndürür.
    var boluMu = calculateArea.value.indexOf("/");//indexOf: verilen bölü değerinin hangi indexte olduğunu döndürür, eğer yok ise -1 döndürür.

    if (artiMi > -1) {//artiMi değerinin -1den büyük olup olmadığını kontrol eder.
        // ["5", "2"]
        var values = calculateArea.value.split('+');//(split: böl, ayır demek) koşul geçerliyse, değerler değişkenine atanan, hesaplama alanınındaki değere + dan önceki ve sonrakilere olmak üzere split yani ayırma işlemi uygulandı. 
        calculateArea.value = parseInt(values[0]) + parseInt(values[1]);//(parseInt: verilen değeri inte yani sayıya dönüştürür) split uygulanan değerleri perseintle 0. ve 1.değerden başlayarak toplama işlemi yapar.
    }

    if (eksiMi > -1) {//eksiMi değerinin -1den büyük olup olmadığını kontrol eder.
        var values = calculateArea.value.split('-');//koşul geçerliyse, değerler değişkenine atanan, hesaplama alanınındaki değere - den önceki ve sonrakilere olmak üzere split yani ayırma işlemi uygulandı.
        calculateArea.value = parseInt(values[0]) - parseInt(values[1]);//(parseInt: verilen değeri inte yani sayıya dönüştürür) split uygulanan değerleri perseintle 0. ve 1.değerden başlayarak çıkarma işlemi yapar.
    }

    if (carpiMi > -1) {//carpiMi değerinin -1den büyük olup olmadığını kontrol eder.
        var values = calculateArea.value.split('*');//koşul geçerliyse, değerler değişkenine atanan, hesaplama alanınındaki değere * dan önceki ve sonrakilere olmak üzere split yani ayırma işlemi uygulandı.
        calculateArea.value = parseInt(values[0]) * parseInt(values[1]);//(parseInt: verilen değeri inte yani sayıya dönüştürür) split uygulanan değerleri perseintle 0. ve 1.değerden başlayarak çarpma işlemi yapar.
    }

    if (boluMu > -1) {//boluMu değerinin -1den büyük olup olmadığını kontrol eder.
        var values = calculateArea.value.split('/');//koşul geçerliyse, değerler değişkenine atanan, hesaplama alanınındaki değere / den önceki ve sonrakilere olmak üzere split yani ayırma işlemi uygulandı.
        calculateArea.value = parseInt(values[0]) / parseInt(values[1]);//(parseInt: verilen değeri inte yani sayıya dönüştürür) split uygulanan değerleri perseintle 0. ve 1.değerden başlayarak bölme işlemi yapar.
    }
}


function clearToCalculateArea() {//hesaplama alanını temizleme fonksiyonu oluşturuldu.
    var calculateArea = document.getElementById("calculate-area");
    calculateArea.value = "";
}



const urunler = [
    { id: 1, name: "Kalem", fiyat: 5 },
    { id: 2, name: "Defter", fiyat: 10 },
    { id: 3, name: "Silgi", fiyat: 2 },
    { id: 4, name: "Kalemtraş", fiyat: 7 },
];

const toplamUrunFiyati = urunler.reduce(
    (toplam, urun) => (toplam = toplam + urun.fiyat),
    0
);

console.log({ toplamUrunFiyati });


const toplamString = urunler.reduce(
    (toplam, urun) => (toplam = '${toplam} ${urun.name}'),
    "Urun Isimleri:"
);

console.log(toplamString);



const toplamUrunFiyati = urunler.reduce((toplam, urun) => toplam = toplam + urun.fiyat, 0);
console.log(toplamUrunFiyati);