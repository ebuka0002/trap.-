import os, cv2, numpy as np
from PIL import Image
UP='/mnt/user-data/uploads'
keys=['683338937','670396744','671030996','670198542','674486671','671253701','696513487','674487154','670500459','670787240','670640824','658914462','468343291','669434841','689056042','670286744','670358612','670279007','670735169']
files={i+1:[f for f in os.listdir(UP) if k in f][0] for i,k in enumerate(keys)}
OUT='src/assets/img'
def load(n): return Image.open(os.path.join(UP,files[n])).convert('RGB')
def inpaint(im, box):
    a=np.array(im)[:,:,::-1].copy()
    m=np.zeros(a.shape[:2],np.uint8); x0,y0,x1,y1=box; m[y0:y1,x0:x1]=255
    a=cv2.inpaint(a,m,9,cv2.INPAINT_TELEA)
    return Image.fromarray(a[:,:,::-1])
def save(im,name,widths=(640,1200),q=80):
    for w in widths:
        if im.width<w: w=im.width
        r=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
        r.save(f'{OUT}/{name}-{w}.webp','WEBP',quality=q,method=6)
    # canonical widths list for lookup
std=(110,480,1330,1700)
# product crops: (n, name, crop, orderbox)
prods=[
 (1,'lagos-skyline-tee',(110,520,1330,1700),(1200,1235,1420,1390)),
 (2,'lagos-crewneck',(110,520,1330,1640),(1200,1235,1420,1390)),
 (3,'staystrong-tank',(110,440,1330,1640),(1200,1190,1420,1340)),
 (5,'street-military-tee',(110,480,1330,1700),(1200,1235,1420,1390)),
 (6,'lagos-nigeria-tee-black',(90,470,1350,1700),(1200,1235,1420,1390)),
 (7,'nigeria-stitch-tee',(120,540,1480,1860),(1330,1360,1590,1550)),
 (8,'zip-polo-black',(90,520,1330,1640),(1200,1235,1420,1390)),
 (9,'stripe-jersey-white',(110,470,1330,1700),(1200,1235,1420,1390)),
 (11,'zip-polo-white',(90,490,1330,1640),(1200,1235,1420,1390)),
 (12,'knit-polo-black',(15,235,670,805),(565,590,672,660)),
 (14,'staystrong-tee',(110,430,1330,1640),(1200,1180,1420,1330)),
 (15,'knit-polo-navy',(15,235,670,805),(565,590,672,660)),
 (16,'stripe-jersey-black',(110,470,1330,1700),(1200,1235,1420,1390)),
 (17,'lagos-nigeria-tee-white',(90,470,1350,1700),(1200,1235,1420,1390)),
]
for n,name,crop,ob in prods:
    im=load(n); im=inpaint(im,ob); im=im.crop(crop); save(im,name)
# hoodies (18)
im=load(18).crop((100,340,1215,1490)); save(im,'staystrong-hoodie')
# photos
save(load(10),'photo-railway',(640,1087))
save(load(4),'photo-airport',(640,1210))
save(load(19),'photo-polo-model',(640,1024))
# details for lookbook / reveal
d={'detail-lagos':(6,(470,740,970,1370)),'detail-skyline':(1,(350,1160,1100,1630)),'detail-flag':(14,(470,660,1020,1100)),'detail-soldier':(5,(350,990,770,1610)),'detail-nigeria':(7,(570,860,1090,1320))}
for k,(n,c) in d.items():
    im=load(n).crop(c); im=im.resize((im.width*2,im.height*2),Image.LANCZOS); save(im,k,(640,1200),82)
# logo: mark + full
lg=Image.open(os.path.join(UP,files[13])).convert('RGB')
lg.crop((200,150,550,450)).resize((700,600),Image.LANCZOS).save(f'{OUT}/logo-mark.png')
lg.save(f'{OUT}/logo-full.png')
mark=lg.crop((225,160,525,450)); mark.resize((180,174)).save('public/apple-touch-icon.png')
sq=Image.new('RGB',(512,512),(0,0,0)); m=lg.crop((215,155,535,445)); m=m.resize((400,362)); sq.paste(m,(56,75)); sq.save('public/favicon-512.png'); sq.resize((64,64)).save('public/favicon.png'); sq.resize((180,180)).save('public/apple-touch-icon.png')
# og image 1200x630 from railway photo
r=load(10); r=r.resize((1200,round(r.height*1200/r.width))); top=int(r.height*0.28); r.crop((0,top,1200,top+630)).save('public/og.jpg',quality=85)
print(os.listdir(OUT))
