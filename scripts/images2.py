import os
exec(open('scripts/images.py').read().split("std=(")[0])
nk=['681351982','724281949','708993458','705154918','714765880','722224161','696652955','713343251','702911424','719874134']
nf={i+1:[f for f in os.listdir(UP) if k in f][0] for i,k in enumerate(nk)}
def ld(n): return Image.open(os.path.join(UP,nf[n])).convert('RGB')
ORD=(1335,1375,1595,1555)
specs=[
 (2,'crochet-vest',(90,555,1510,1800),ORD,None),
 (3,'floral-tee',(150,520,1130,1500),ORD,None),
 (3,'piping-shorts',(560,1240,1340,2000),ORD,None),
 (4,'mudcloth-polo',(110,540,1510,1880),ORD,None),
 (5,'bucket-hat',(130,520,1500,1780),ORD,None),
 (6,'big-dream-tee',(110,540,1500,1870),ORD,None),
 (7,'nigeria-stitch-tee-black',(110,540,1500,1870),ORD,None),
 (8,'chained-fist-tank',(150,535,1480,1860),ORD,None),
 (9,'floral-polo',(110,545,1490,1870),ORD,None),
 (10,'benin-mask-tee',(0,730,930,1730),None,None),
 (10,'cargo-shorts-sand',(790,1270,1420,1830),None,None),
]
for n,name,crop,ob,_ in specs:
    im=ld(n)
    if ob: im=inpaint(im,ob)
    save(im.crop(crop),name)
save(ld(1) if False else Image.open(os.path.join(UP,nf[1])).convert('RGB'),'photo-street',(640,1024))
det={'detail-bigdream':(6,(560,820,1120,1480)),'detail-mask':(10,(170,1150,780,1730)),'detail-fist':(8,(560,860,1030,1530))}
for k,(n,c) in det.items():
    im=ld(n).crop(c); save(im,k,(640,1200),82)
print(len(os.listdir(OUT)))
