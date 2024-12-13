class e{toThousands(t){let o=[],s=0;t=(t||0).toString().split("");for(let l=t.length-1;l>=0;l--)s++,o.unshift(t[l]),!(s%3)&&l!=0&&o.unshift(",");return o.join("")}}const n=new e;export{n as G};
