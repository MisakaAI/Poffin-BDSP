function cal(n) {

    if ( n != 0) {
        var name = document.getElementById("berry" + n).value
        if ( name == "不放树果" ) {
            document.getElementById("berry_img_" + n).src="berry/Dream_" + name + "_Sprite.png"
            document.getElementById("href_" + n).href=""
            document.getElementById("href_" + n).style.pointerEvents="none"
        } else {
            document.getElementById("berry_img_" + n).src="berry/Dream_" + name + "_Sprite.png"
            document.getElementById("href_" + n).href="berry.html#" + name
            document.getElementById("href_" + n).style.pointerEvents="auto"
        }
    }

    var La=Berry[berry1.value].辣+Berry[berry2.value].辣+Berry[berry3.value].辣+Berry[berry4.value].辣
    var Se=Berry[berry1.value].涩+Berry[berry2.value].涩+Berry[berry3.value].涩+Berry[berry4.value].涩
    var Tian=Berry[berry1.value].甜+Berry[berry2.value].甜+Berry[berry3.value].甜+Berry[berry4.value].甜
    var Ku=Berry[berry1.value].苦+Berry[berry2.value].苦+Berry[berry3.value].苦+Berry[berry4.value].苦
    var Suan=Berry[berry1.value].酸+Berry[berry2.value].酸+Berry[berry3.value].酸+Berry[berry4.value].酸

    // 口味负值数量
    var negative = 0
    // 帅气=∑辣-∑涩
    var SQ = La - Se
    if (SQ < 0) {
        SQ=0
        negative+=1
    }
    document.getElementById("ShuaiQi").innerText=SQ
    // 美丽=∑涩-∑甜
    var ML = Se - Tian
    if (ML < 0) {
        ML=0
        negative+=1
    }
    document.getElementById("MeiLi").innerText=ML
    // 可爱=∑甜-∑苦
    var KA = Tian - Ku
    if (KA < 0) {
        KA=0
        negative+=1
    }
    document.getElementById("KeAi").innerText=KA
    // 聪明=∑苦-∑酸
    var CM = Ku - Suan
    if (CM < 0) {
        CM=0
        negative+=1
    }
    document.getElementById("CongMing").innerText=CM
    // 强壮=∑酸-∑辣
    var QZ = Suan - La
    if (QZ < 0) {
        QZ=0
        negative+=1
    }
    document.getElementById("QiangZhuang").innerText=QZ
    // 口味值
    KW = {
        "辣" : SQ,
        "涩" : ML,
        "甜" : KA,
        "苦" : CM,
        "酸" : QZ,
    }
    // 口味值数量
    var KW_num = 0
    // 口味
    var Poffin
    // 口味值最高大于50，香醇。同时计算口味值数量。
    for (var i in KW) {
        if (KW[i] > 0) {
            KW_num+=1
            if (KW[i] > 50) {
                Poffin  = "香醇宝芬"
            }
        }
    }
    // 口味数量3个，浓厚。4个，腻口。否则，计算两个最高的数值，并排序。
    if (Poffin != "香醇宝芬") {
        if (KW_num == 3) {
            Poffin  = "浓厚宝芬"
        } else if (KW_num == 4) {
            Poffin  = "腻口宝芬"
        } else {
            var n1 = 0
            var n2 = 0
            var p1 = ''
            var p2 = ''
            // 口味最高的值
            for (var x in KW) {
                for (var y in KW) {
                    if (x != y) {
                        if ((KW[x] - KW[y]) > n1)  {
                            n1 = KW[x] - KW[y]
                            p1 = x
                        }
                    }
                }
            }
            // 口味第二高的值
            for (var x in KW) {
                for (var y in KW) {
                    if (x != y && x != p1) {
                        if ((KW[x] - KW[y]) > n2) {
                            n2 = KW[x] - KW[y]
                            p2 = x
                        }
                    }
                }
            }
            Poffin = p1 + p2 + "宝芬"
        }
    }
    // 口味值都是0，难吃
    var KW_0 = 0
    for (var i in KW) {
        KW_0 += KW[i]
    }
    if (KW_0 == 0) {
        Poffin  = "难吃宝芬"
    }
    // 口味值负数大于3个，难吃
    if (negative>=3) {
        Poffin  = "难吃宝芬"
    }
    // 计算树果数量，重复树果大于2个，难吃
    var berry_all = [berry1.value,berry2.value,berry3.value,berry4.value]
    var all = []
    for (var b in berry_all) {
        if (berry_all[b] != '不放树果') {
            all.push(berry_all[b])
        }
    }
    for (var x in all) {
        for (var y in all) {
            if (x != y) {
                if (all[x] == all[y]) {
                    Poffin  = "难吃宝芬"
                }
            }
        }
    }
    // 润口度
    
    // 没有树果
    if (all.length == 0) {
        Poffin="空气是无色无味透明的。"
        RK="润了个寂寞。"
    } else {
        var RK = 0
        for (var i in all) {
            RK += Berry[all[i]]['润']
        }
        RK = parseInt(RK / all.length - all.length)
    }
    // 难吃则标注为0
    if (Poffin == "难吃宝芬") {
        document.getElementById("ShuaiQi").innerText=0
        document.getElementById("MeiLi").innerText=0
        document.getElementById("KeAi").innerText=0
        document.getElementById("CongMing").innerText=0
        document.getElementById("QiangZhuang").innerText=0
        document.getElementById("kw_info").innerText="随机3种口味值为2，其余2种口味值为0。"
    } else {
        document.getElementById("kw_info").innerText=""
    }
    document.getElementById("KouWei").innerText=Poffin
    document.getElementById("RunKou").innerText=RK
}

function clean() {
    berry1.value="不放树果"
    berry2.value="不放树果"
    berry3.value="不放树果"
    berry4.value="不放树果"
    document.getElementById("href_1").style.pointerEvents="none"
    document.getElementById("href_2").style.pointerEvents="none"
    document.getElementById("href_3").style.pointerEvents="none"
    document.getElementById("href_4").style.pointerEvents="none"
    document.getElementById("berry_img_1").src="berry/Dream_不放树果_Sprite.png"
    document.getElementById("berry_img_2").src="berry/Dream_不放树果_Sprite.png"
    document.getElementById("berry_img_3").src="berry/Dream_不放树果_Sprite.png"
    document.getElementById("berry_img_4").src="berry/Dream_不放树果_Sprite.png"
    document.getElementById("ShuaiQi").innerText=""
    document.getElementById("MeiLi").innerText=""
    document.getElementById("KeAi").innerText=""
    document.getElementById("CongMing").innerText=""
    document.getElementById("QiangZhuang").innerText=""
    document.getElementById("KouWei").innerText=""
    document.getElementById("RunKou").innerText=""
    document.getElementById("kw_info").innerText=""
}