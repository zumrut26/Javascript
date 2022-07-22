
//.reduce()
let ageSum = data.reduce((sum, item) => sum + item.age, 0);
console.log("age.sum", ageSum);

//.reduce()

const urunler = [
    { id: 1, name: "Kalem", fiyat: 5 },
    { id: 2, name: "Defter", fiyat: 10 },
    { id: 3, name: "Silgi", fiyat: 2 },
    { id: 4, name: "Kalemtraş", fiyat: 7 },
];

const toplamUrunFiyati = urunler.reduce(
    (toplam, urun) => toplam = toplam + urun.fiyat, 0);
console.log(toplamUrunFiyati);

//.reduce()

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



//.some() Arraydeki elemanlardan belirtilen şarta uygun en az 1 tane bile kayıt varsa some geri dönüş olarak true verir.

let result = data.some(item => item.gender == "female");
console.log("Result", result);



//.every()uygulanan şarta bütün elemanların uymasını bekler.eğer bir tane bile uymayan varsa geri dönüş olarak false verir.

let result = data.every(item => item.isActive);
console.log("Result", result);

//.startsWith()


//.endsWith()


//.flat()