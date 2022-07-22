const cvs = document.getElementById('game') //cvs(canvas) tuval demektir. Çizimler, animasyonlar yapmak için kullanılır. 
const ctx = cvs.getContext('2d') //ctx(context) bağlam demektir. tuval üzerinde işlem yapılacak alanı belirtir. tüm işlemlerimizi context içerisinde yaparız.

const drawRect = (x, y, w, h, color) => { //drawRect => dörtgen çizdirme fonksiyonudur. x ve y koordinatları, w(width) ve h(height) genişlik ve yüksekliğidir, color ise bu objenin rengidir.
    ctx.fillStyle = color //tuvale uygulanacak olan rengi fillstyle ile belirleriz.
    ctx.fillRect(x, y, w, h)//fillRect dikdörtgen çizmek için kullanılır.
}

const drawCircleF = (x, y, r, color) => {//drawCircleF daire çizdirme fonksiyonudur. x ve y koordinatlarını, r yarıçapını, color rengini belirtmek için verilir.
    ctx.fillStyle = color// fill: doldurmak demektir. daire içine doldurulan rengi belirtmek için kullanılır.
    ctx.beginPath()//çizimi başlatmak için kullanılır.
    ctx.arc(x, y, r, 0, 2 * Math.PI, false)//çizimi başlattıktan sonra false vererek içini doldurarak daire çizmek için belirtilir.
    ctx.closePath()//çizimi bitirmek için
    ctx.fill()//çizimi doldurmak için 
}

const drawCircleS = (x, y, r, w, color) => {//drawCircleS daire çizdirme fonksiyonudur. x ve y koordinatlarını, r yarıçapını, color rengini belirtmek için verilir.
    ctx.strokeStyle = color // stroke: çizgi çizmek demektir. dairenin çizgilerine uygulanacak rengi belirler.
    ctx.lineWidth = w //linewidth: hat genişliği demektir. hat genişliği w yani width e göre verilecektir.
    ctx.beginPath() //çizimi başlatmak için kullanılır.
    ctx.arc(x, y, r, 0, 2 * Math.PI)//çizimi başlattıktan sonra verilen koordinatlara göre çizme işlemi uygulamak için kullanılır.
    ctx.closePath() //çizimi durdurmak için verilir.
    ctx.stroke()//işlemin stroke yani çizgi çizmek için kullanılacağını belirtir.
}

const drawText = (text, x, y, color) => {//drawText: çizim metni demektir. Komut olarak belirlenen şeyler metin, koordinatları ve rengi olacağıdır.
    ctx.fillStyle = color // fill: doldurmak demektir. Metin içine doldurulan rengi belirtmek için kullanılır.
    ctx.font = '50px sans-serif'//metine uygulanacak fontu belirliyor.
    ctx.fillText(text, x, y) //fillText: metni doldur demektir. Doldurulma komutu, text (metin), x,y (konum) içerisine uygulama yapılır.
}

const user = {//const yani sabit içerisindeki user(kullanıcı) tarafına ulaşmak için yazılır.
    x: 20, //koordinatın yatay pozisyonuna 20 değeri verilmiştir.
    y: cvs.height / 2 - 50,//cvs.height: canvas yani tuvalin yüksekliği demektir. Yüksekliğin yarısından 50 çıkarılmıştır.
    w: 10,//user alanının genişliğe 10 değeri verilmiştir.
    h: 100,//yüksekliğine 100 değeri verilmiştir.
    color: '#fff',//rengi beyaz verilmiştir.
    score: 0//skor 0 yazsın denilmiştir.
}

const com = {//const içereisindeki com(bilgisayar) tarafına ulaşmak içindir.
    x: cvs.width - 30,//koordinatın yatay pozisyonu canvas genişliğinden 30 yıkarılarak verilsin denmiştir.
    y: cvs.height / 2 - 50,//koordinatın dikey pzoisyonu canvas yüksekliğinin yarısından 50 çıkarılarak verilsin denmiştir.
    w: 10, //user alanının genişliğe 10 değeri verilmiştir.
    h: 100, //yüksekliğine 100 değeri verilmiştir.
    color: '#fff', //rengi beyaz verilmiştir.
    score: 0 //skor 0 yazsın denilmiştir.
}

const ball = {//const içerisindeki ball(top) objesine ulaşmak içindir..
    x: cvs.width / 2,//koordinatın yatay pozisyonu canvas genişliğinin yarısı olsun denmiştir.
    y: cvs.height / 2,//koordinatın dikey pzoisyonu canvas yüksekliğinin yarısı olsun denmiştir.
    r: 13,// yarıçapına 13 değeri verilmiştir.
    color: '#a51890',//renk kodu verilmiştir.
    speed: 5,//ball hızı olarak 5 değeri verilmiştir.
    velocityX: 3,//ball'un x yatay koordinatındaki hızına 3 değeri verilmiştir.
    velocityY: 4,//ball'un y dikey koordinatındaki hızına 4 değeri verilmiştir.
    stop: true//ball oyun başladığında hareket etmesin diye stop verilmiştir.
}

const movePaddle = (e) => {//mouse hareket ettiğinde çubuk dikey eksende hareket etmesi için kullanılmıştır.
    let rect = cvs.getBoundingClientRect()//canvasın altında getBoundingClientRect diyerek bu hareketi takip edebiliriz.
    user.y = e.clientY - rect.top - user.h / 2//userın y değeriyle eşitlenmiştir. mouseun clientdaki y değeri alınmış rectin top değeri ve userın yüksekliğinin yarısı çıkarılmıştır.
    ball.stop = false//maouse hareket ettiği taktirde sabit olan top hareketlensin.
}

cvs.addEventListener('mousemove', movePaddle)//mause hareketine verilmek için kullanılır.

const collision = (b, p) => {//topun playerının değerlerini almak için verilmiştir.
    b.top = b.y - b.r// üst noktası için topun y ekseninden yarı çapı çıkartılmıştır. 
    b.bottom = b.y + b.r//alt noktası için topun y ekseninine yarı çapı eklenilmiştir.
    b.left = b.x - b.r//sol noktası için topun x ekseninden yarıçapı çıkarılmıştır.
    b.right = b.x + b.r//sağ noktası için topun x eksenindeki değerine yarıçapı eklenilmiştir.

    p.top = p.y//playerın en üst noktası y ekseniyle eşitlenmiştir.
    p.bottom = p.y + p.h//en alt noktası için playerın y eksenine yüksekliği eklenmiştir.
    p.left = p.x//sol noktası ile x ekseni eşitlenmiştir.
    p.right = p.x + p.w//sağ noktası için x ekseniyle genişiği toplanmıştır.

    return (b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left)//4 durum birbiryle kıyaslanacak. eğer topun en üst kısmı en alt noktasından küçükse geriye true ile geri dönsün.
}

const resetBall = () => {//topu orta noktaya geri almak, oyun resetlendiğinde bu fonksiyon ile çalışması için verilmiştir.
    ball.x = cvs.width / 2//topun x değeri ile canvasın genişliği bölünmüştür.
    ball.y = cvs.height / 2//topun y değeri ile canvasın yüksekliği bölünmüştür.

    ball.speed = 5//topun hızına 5 değeri verilmiştir.
    ball.velocityX = 3//topun x eksenindeki hızına 3 değeri verilmiştir.
    ball.velocityY = 4//topun y ekssenindeki hızına 4 değeri verilmiştir.
    ball.stop = true//true değeri topun oyun başlamadan önce durulması için verilmiştir.
}

const update = () => {//oyunun dinamik olan ögelerini denetlemek için update fonksiyonu kullanılır.
    if (!ball.stop) { //{kullanıcı hareket etmeden top sabit olarak kalması için verilmiştir.
        ball.x += ball.velocityX//x ve y de topun hareket etmesi gerektiği için xdeki hızıyla ydeki hızın koordinatlarları toplanmıştır.
        ball.y += ball.velocityY//x ve y de topun hareket etmesi gerektiği için xdeki hızıyla ydeki hızın koordinatlarları toplanmıştır.
    }

    if (ball.y + ball.r > cvs.height || ball.y - ball.r < 0) //topun y ekseniyle topun yarıçapı canvasın yüksekliğinden büyükse toplanır veya topun y ekseniyle topun yarıçapı 0 ekseninden küçükse çıkarılır.
        ball.velocityY = -ball.velocityY //bu koşula göre hızı geriye döner.

    let comLvl = 0.1//oyunun zorluk derecesi verilmiştir. 
    com.y += (ball.y - (com.y + com.h / 2)) * comLvl//bilgisayarın y eksenindeki değeri topun y eksenindekinden çubuğun orta noktası çıkarılmıştır. bunun için bilg. y ekseni ile yüksekliği toplanıp 2ye bölünmüştür.

    let player = (ball.x < cvs.width / 2) ? user : com//topun x eksenindeki değeri eğer canvasın tüm genişliğinin yarısı ise ? usera daha yakın değil ise bilgisayar tarafına daha yakın demek oluyor.
    if (collision(ball, player)) {//top ve aktif player buraya gönderilmiştir. geriye eğer bir true değeri dönerse;
        let intersectY = ball.y - (player.y + player.h / 2)//topun y değerinden playerın çubuğu 
        intersectY /= player.h / 2//varolan yükseklik çubuğun yüksekliğine bölünür.

        let maxBounceRate = Math.PI / 3//sıçrama açısı belirlemek için maxBounceRate kullanılır. maximum sıçrama oranı anlamına gelir. pi oranını 3 e bölerek istenilen açı elde edilir.
        let bounceAngle = intersectY * maxBounceRate//bounceAngle: sıçrama oranı demektir. intersectY ile yani seçilen yekseniyle maxRate çarpılmıştır.

        //top sağa doğru gidiyorsa geri dönebilmesi için eksi değeri alması gerekiyor. bunun için orta noktanın üzerinden topa bir direction belirlenir;
        let direction = (ball.x < cvs.width / 2) ? 1 : -1//eğer topun x eksenindeki değeri canvasın yüksekliğinden küçükse değer 1 olacak, değilse -1 olacak. 

        ball.velocityX = direction * ball.speed * Math.cos(bounceAngle)//topun x eksenindeki hızını belirlemek için direction ile topun hızı çarpılmış, cosine ile elde edilen açının değeriyle çarpılmış ve x eksenindeki hızına erişilmiştir.
        ball.velocityY = ball.speed * Math.sin(bounceAngle)//aynı şekilde topun y eksenindeki hızını belirlemek için topun hızı, sine ile elde edilen açının değeriyle çarpılmış ve y eksenindeki hızına erişilmiştir.

        ball.speed += 2// her çarpışmadan topun hızını arttırmak için verilmiştir.
    }

    if (ball.x > cvs.width) {//çarpışma yoksa bir sayı üretmesi için koşul olarak, topun xdeki değeri eğer canvasın tüm genişliğinden büyükse;
        user.score++//kullanıcı bir sayı üretsin.
        resetBall()//daha sonra top resetlenmesi için resetBall fonksiyonu oluşturulmuştur.
    } else if (ball.x < 0) {//yukarıdaki koşullar değil ise eğer topun xdeki değeri o noktasından küçükse;
        com.score++//com bir sayı üretsin
        resetBall()//sayı ürettikten sonra top resetlenmesi için resetBall fonksiyonu oluşturulmuştur.
    }
}

const render = () => {//render: vermek demektir. const içerisinde oyunun görselliğini hazırlamak için kullanılır.
    drawRect(0, 0, cvs.width, cvs.height, '#008374')//arkaplan için canvasın genişliği ve yüksekliğini alarak çizilsin. renk olarak yeşil çizilsin.
    drawRect(cvs.width / 2 - 2, 0, 4, cvs.height, '#fff')//orta şerit için; dikdörtgen çizimi yapılmıştır. x koordinatı canvasın orta noktası olarak belirlenmiştir. bunun için genişlik ikiye bölünmüş ve 2 değeri çıkarılmıştır. ve renk kodu verilmiştir. 
    drawCircleF(cvs.width / 2, cvs.height / 2, 8, '#fff')//drawCircleF'te canvasın yükseklik ve genişliğinin yarısı alınmış, orta noktaya ulaşılmıştır. 8px yarıçapı ve renk kodu verilmiştir.
    drawCircleS(cvs.width / 2, cvs.height / 2, 50, 4, '#fff')//drawCircleS ile yine canvasın yükseklik ve genişliğinin yarısı alınmış, orta noktaya ulaşılmıştır. stroke olduğu için içi boş çemberi 50px açısında 4px kalınlığında ve renk kodu ile verilmiştir.
    drawText(user.score, cvs.width / 4, 100, '#fff')//user alanındaki skorun yazılacağı konumu belirlemek için canvasın genişliği 4e bölünmüştür. yukarıdan 100px değerinde konumlanması için 100 rengi için beyaz verilmiştir.
    drawText(com.score, 3 * cvs.width / 4, 100, '#fff')//com alanındaki score alanı için canvas genişliği 3le çarpılmıştır.

    drawRect(user.x, user.y, user.w, user.h, user.color)//dinamik yapı oluşturmak için userın koordinatları kullanılmıştır.
    drawRect(com.x, com.y, com.w, com.h, com.color)//aynı koordinatlar com alanında da kullanılmıştır.
    drawCircleF(ball.x, ball.y, ball.r, ball.color)//aynı koordinatlar ball objesi için kullanılmıştır.
}

const game = () => { //bütün oyunla alakalı içerikler buradan yönetilir...
    update()//güncelleme demek
    render()//vermek demek
}

const fps = 50//oyun her saniye kendisini güncellemesi için fps verilmiştir.
setInterval(game, 1000 / 50)//her saniye 50 kare göstermesi için verilmiştir.





// drawRect(100,100,150,50,"green");
// drawCircleF(100,100,50,"green");
// drawCircleS(100, 100, 50, 2, "green");







/*
drawRect(0,0,600,400,'#000')
drawCircleS(50,50,10,#fff)
drawCircleS(250,250,50,10,#fff)
drawText('deneme',400,200)*/

