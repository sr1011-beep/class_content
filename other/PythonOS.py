import tkinter as tk
from tkinter import ttk
from datetime import datetime
import ast, operator, json
from pathlib import Path

BG='#102a50'; PANEL='#f4f7fb'; INK='#18283f'; MUTED='#607087'; BLUE='#2369dc'
FONT='Segoe UI'

class PythonOS:
    def __init__(self, root):
        self.root=root; root.title('PythonOS — Virtual Desktop'); root.geometry('1100x700'); root.minsize(780,500)
        self.windows={}; self.tasks={}; self.active=None; self.menu=None; self.notice=None
        self.store=Path.home()/'.pythonos_demo_notes.json'
        self.files={'Documents':{'Welcome.txt':'Welcome to PythonOS!\n\nThis is a virtual desktop built entirely with Python and tkinter.\nTry the Start menu, Calculator and Terminal.'},'Pictures':{},'Downloads':{}}
        try:
            data=json.loads(self.store.read_text(encoding='utf-8'))
            if isinstance(data,dict): self.files['Documents'].update({k:v for k,v in data.items() if isinstance(k,str) and isinstance(v,str)})
        except (OSError,ValueError): pass
        self.desktop=tk.Frame(root,bg=BG); self.desktop.pack(fill='both',expand=True)
        self.canvas=tk.Canvas(self.desktop,bg=BG,highlightthickness=0); self.canvas.place(relwidth=1,relheight=1); self.canvas.bind('<Configure>',self.paint)
        self.canvas.bind('<Button-1>',lambda e:self.hide_menu())
        self.apps={'Explorer':('▰','File Explorer',self.explorer),'Notepad':('▤','Notepad',self.notepad),'Calculator':('▦','Calculator',self.calculator),'Terminal':('›_','Terminal',self.terminal),'Settings':('⚙','Settings',self.settings)}
        for i,(key,(symbol,label,fn)) in enumerate(self.apps.items()):
            box=tk.Frame(self.desktop,bg=BG,cursor='hand2'); box.place(x=20,y=24+i*83,width=98,height=72)
            icon=tk.Label(box,text=symbol,font=(FONT,25,'bold'),bg=BG,fg=['#f7cd73','#b9dcff','#9fe5d0','#dce9ff','#dce9ff'][i]); icon.pack()
            title=tk.Label(box,text=label,font=(FONT,9),bg=BG,fg='white'); title.pack()
            for widget in (box,icon,title): widget.bind('<Button-1>',lambda e,k=key:self.open(k))
        self.bar=tk.Frame(root,bg='#edf2fa',height=53); self.bar.pack(fill='x',side='bottom'); self.bar.pack_propagate(False)
        self.brand=tk.Label(self.bar,text='◈  PythonOS',font=(FONT,11,'bold'),bg='#edf2fa',fg=INK); self.brand.pack(side='left',padx=18)
        self.clock=tk.Label(self.bar,bg='#edf2fa',fg=INK,font=(FONT,9),justify='right'); self.clock.pack(side='right',padx=17); self.tick()
        self.center=tk.Frame(self.bar,bg='#edf2fa'); self.center.place(relx=.5,rely=.5,anchor='center')
        self.button(self.center,'⊞',self.toggle_menu,bg='#dce8fa',fg=BLUE,font=(FONT,19,'bold'),width=3).pack(side='left',padx=3)
        for key in ('Explorer','Notepad','Calculator','Terminal','Settings'):
            b=self.button(self.center,self.apps[key][0],lambda k=key:self.task_click(k),bg='#edf2fa',fg=INK,font=(FONT,16,'bold'),width=3); b.pack(side='left',padx=2); self.tasks[key]=b
        root.bind('<Escape>',lambda e:self.hide_menu()); root.bind('<F11>',lambda e:root.attributes('-fullscreen',not root.attributes('-fullscreen')))
        root.after(180,lambda:self.open('Explorer'))
    def button(self,parent,text,cmd,bg='#e5ecf6',fg=INK,font=(FONT,10),**kw):
        return tk.Button(parent,text=text,command=cmd,bg=bg,fg=fg,activebackground='#cdddf4',activeforeground=INK,relief='flat',bd=0,cursor='hand2',font=font,**kw)
    def paint(self,e):
        c=self.canvas; c.delete('wall'); w,h=e.width,e.height
        for y in range(0,h,4):
            t=y/max(1,h); color='#%02x%02x%02x'%(int(16+13*t),int(42+26*t),int(80+43*t)); c.create_rectangle(0,y,w,y+4,fill=color,outline='',tags='wall')
        # layered abstract wallpaper
        for i,col in enumerate(['#183d78','#204c92','#285da8','#3471bf','#4b8bd7']):
            shift=i*39; c.create_polygon(w*.42+shift,h*1.15,w*.30+shift,h*.53,w*.48+shift,h*.14,w*.78+shift,-h*.12,w*1.2+shift,h*.04,w*.92+shift,h*.32,w*.66+shift,h*.48,w*.58+shift,h*.80,w*.85+shift,h*1.15,fill=col,outline='',smooth=True,splinesteps=35,tags='wall')
        c.create_text(w-28,25,anchor='ne',text='PythonOS  /  Desktop 01',fill='#d7e7ff',font=(FONT,11,'bold'),tags='wall')
        c.create_text(w-28,h-24,anchor='se',text='Developer Preview  •  v0.1',fill='#c2d5ee',font=(FONT,10),tags='wall')
    def tick(self):
        self.clock.config(text=datetime.now().strftime('%H:%M\n%Y-%m-%d')); self.root.after(1000,self.tick)
    def hide_menu(self):
        if self.menu: self.menu.destroy(); self.menu=None
    def toggle_menu(self):
        if self.menu: self.hide_menu(); return
        m=tk.Frame(self.desktop,bg=PANEL,highlightbackground='#cbd8eb',highlightthickness=1); self.menu=m
        m.place(relx=.5,rely=1,y=-12,anchor='s',width=380,height=345); m.lift()
        tk.Label(m,text='PythonOS',font=(FONT,22,'bold'),bg=PANEL,fg=INK).pack(anchor='w',padx=22,pady=(18,3))
        tk.Label(m,text='Pinned apps',font=(FONT,11,'bold'),bg=PANEL,fg=MUTED).pack(anchor='w',padx=22,pady=8)
        grid=tk.Frame(m,bg=PANEL); grid.pack(fill='x',padx=18)
        for i,(key,(symbol,label,_)) in enumerate(self.apps.items()):
            self.button(grid,symbol+'\n'+label,lambda k=key:self.open(k),bg='#e6edf8',width=13,height=3).grid(row=i//3,column=i%3,padx=4,pady=4)
        footer=tk.Frame(m,bg='#e4ecf7'); footer.pack(side='bottom',fill='x'); tk.Label(footer,text='●  Local user',bg='#e4ecf7',fg=INK,font=(FONT,11)).pack(side='left',padx=15,pady=10)
        self.button(footer,'Exit desktop',self.root.destroy,bg='#e4ecf7').pack(side='right',padx=10)
    def focus(self,key):
        if key not in self.windows:return
        self.windows[key]['frame'].lift(); self.active=key
        for k,b in self.tasks.items(): b.config(bg='#cbdcf7' if k==key else '#e1e9f5' if k in self.windows else '#edf2fa')
    def task_click(self,key):
        if key in self.windows and self.active==key and self.windows[key]['frame'].winfo_ismapped(): self.minimize(key)
        else:self.open(key)
    def open(self,key):
        self.hide_menu()
        if key in self.windows:
            info=self.windows[key]; info['frame'].place(**info['geometry']); self.focus(key); return info['body']
        f=tk.Frame(self.desktop,bg=PANEL,highlightthickness=1,highlightbackground='#8ca4c4')
        n=len(self.windows); w,h={'Explorer':(700,430),'Notepad':(540,390),'Calculator':(320,440),'Terminal':(620,360),'Settings':(520,360)}[key]
        geom=dict(x=min(160+n*30,max(10,self.desktop.winfo_width()-w-10)),y=55+n*22,width=w,height=h); f.place(**geom)
        title=tk.Frame(f,bg='#e2ebf8',height=40); title.pack(fill='x'); title.pack_propagate(False)
        lbl=tk.Label(title,text='  '+self.apps[key][0]+'   '+self.apps[key][1],bg='#e2ebf8',fg=INK,font=(FONT,11,'bold')); lbl.pack(side='left')
        for txt,cmd in [('×',lambda:self.close(key)),('□',lambda:self.maximize(key)),('−',lambda:self.minimize(key))]: self.button(title,txt,cmd,bg='#e2ebf8',font=(FONT,13),width=4).pack(side='right',fill='y')
        body=tk.Frame(f,bg=PANEL); body.pack(fill='both',expand=True)
        self.windows[key]={'frame':f,'body':body,'geometry':geom,'max':False}
        def start(e): self.focus(key); self.drag=(e.x_root-f.winfo_x(),e.y_root-f.winfo_y())
        def move(e):
            if self.windows[key]['max']:return
            g=self.windows[key]['geometry']; g.update(x=max(0,min(e.x_root-self.drag[0],self.desktop.winfo_width()-100)),y=max(0,min(e.y_root-self.drag[1],self.desktop.winfo_height()-40))); f.place(**g)
        for widget in (title,lbl):widget.bind('<Button-1>',start);widget.bind('<B1-Motion>',move);widget.bind('<Double-Button-1>',lambda e:self.maximize(key))
        self.apps[key][2](body); self.focus(key); return body
    def close(self,key):self.windows.pop(key)['frame'].destroy();self.tasks[key].config(bg='#edf2fa'); self.active=None
    def minimize(self,key): self.windows[key]['frame'].place_forget(); self.tasks[key].config(bg='#e1e9f5');self.active=None
    def maximize(self,key):
        i=self.windows[key]; i['frame'].place_forget()
        if i['max']: i['geometry']=i['restore']; i['max']=False
        else: i['restore']=i['geometry'].copy();i['geometry']=dict(x=0,y=0,relwidth=1,relheight=1);i['max']=True
        i['frame'].place(**i['geometry']);self.focus(key)
    def explorer(self,b):
        bar=tk.Frame(b,bg='#f9fbff');bar.pack(fill='x',padx=12,pady=10)
        path=tk.StringVar(value='This PC'); self.button(bar,'⌂ Home',lambda:show('This PC')).pack(side='left',padx=(0,8),ipadx=8,ipady=5)
        tk.Label(bar,textvariable=path,bg='white',fg=MUTED,anchor='w',padx=12,pady=7).pack(side='left',fill='x',expand=True)
        main=tk.Frame(b,bg='white');main.pack(fill='both',expand=True,padx=12,pady=(0,12)); side=tk.Frame(main,bg='#edf2fa',width=145);side.pack(side='left',fill='y');side.pack_propagate(False)
        area=tk.Frame(main,bg='white');area.pack(side='left',fill='both',expand=True,padx=18,pady=12)
        for name in ['This PC',*self.files]: self.button(side,('⌂  ' if name=='This PC' else '▰  ')+name,lambda n=name:show(n),bg='#edf2fa',anchor='w').pack(fill='x',ipady=7,padx=7)
        def show(name):
            path.set('This PC' if name=='This PC' else 'This PC  /  '+name)
            for w in area.winfo_children():w.destroy()
            tk.Label(area,text='Quick access' if name=='This PC' else name,bg='white',fg=INK,font=(FONT,17,'bold')).pack(anchor='w',pady=(0,5))
            tk.Label(area,text='Your virtual workspace' if name=='This PC' else f'{len(self.files[name])} item(s)',bg='white',fg=MUTED,font=(FONT,10)).pack(anchor='w',pady=(0,16))
            if name=='This PC':
                cards=tk.Frame(area,bg='white');cards.pack(fill='x')
                for n in self.files:self.button(cards,'▰\n'+n,lambda k=n:show(k),bg='#edf3fb',fg=INK,width=13,height=4,font=(FONT,11)).pack(side='left',padx=(0,8))
                tk.Label(area,text='Recent files',bg='white',fg=INK,font=(FONT,12,'bold')).pack(anchor='w',pady=(24,8))
                self.button(area,'▤  Welcome.txt',lambda:self.edit_file('Welcome.txt'),bg='#f2f6fc',anchor='w').pack(fill='x',ipady=8)
            else:
                for f in self.files[name]: self.button(area,'▤  '+f,lambda k=f:self.edit_file(k),bg='#eef3fb',anchor='w').pack(fill='x',pady=3,ipady=6)
                if not self.files[name]:tk.Label(area,text='This folder is empty.',bg='white',fg=MUTED).pack(pady=35)
        show('This PC')
    def edit_file(self,name):
        self.open('Notepad'); self.note_name.set(name); self.note.delete('1.0','end');self.note.insert('1.0',self.files['Documents'].get(name,''))
    def notepad(self,b):
        row=tk.Frame(b,bg=PANEL);row.pack(fill='x',padx=10,pady=8);self.note_name=tk.StringVar(value='Untitled.txt');tk.Entry(row,textvariable=self.note_name,relief='flat',font=(FONT,11)).pack(side='left',fill='x',expand=True,ipady=5)
        status=tk.Label(b,text='Ready • Virtual Documents',bg=PANEL,fg=MUTED,anchor='w');status.pack(side='bottom',fill='x',padx=10,pady=5)
        def save():
            name=self.note_name.get().strip() or 'Untitled.txt'
            if not name.endswith('.txt'):name+='.txt'
            self.files['Documents'][name]=self.note.get('1.0','end-1c');self.note_name.set(name)
            try:self.store.write_text(json.dumps(self.files['Documents'],ensure_ascii=False),encoding='utf-8');status.config(text='Saved • '+name)
            except OSError:status.config(text='Saved for this session only')
        self.button(row,'Save',save,bg=BLUE,fg='white').pack(side='right',padx=6,ipadx=15,ipady=5)
        self.note=tk.Text(b,wrap='word',font=(FONT,12),relief='flat',padx=12,pady=12,undo=True);self.note.pack(fill='both',expand=True,padx=10)
    def calculator(self,b):
        val=tk.StringVar(value='0'); tk.Label(b,textvariable=val,bg='white',fg=INK,font=(FONT,28),anchor='e',padx=10).pack(fill='x',padx=12,pady=16,ipady=13)
        grid=tk.Frame(b,bg=PANEL);grid.pack(fill='both',expand=True,padx=10,pady=(0,10))
        def calc(s):
            v=val.get()
            if s=='C':val.set('0')
            elif s=='⌫':val.set(v[:-1] or '0')
            elif s=='=':
                try:
                    ops={ast.Add:operator.add,ast.Sub:operator.sub,ast.Mult:operator.mul,ast.Div:operator.truediv,ast.Mod:operator.mod}
                    def ev(n):
                        if isinstance(n,ast.Constant) and type(n.value) in (int,float):return n.value
                        if isinstance(n,ast.BinOp) and type(n.op) in ops:return ops[type(n.op)](ev(n.left),ev(n.right))
                        if isinstance(n,ast.UnaryOp) and isinstance(n.op,(ast.USub,ast.UAdd)):return -ev(n.operand) if isinstance(n.op,ast.USub) else ev(n.operand)
                        raise ValueError()
                    val.set(str(ev(ast.parse(v.replace('×','*').replace('÷','/'),mode='eval').body)))
                except Exception:val.set('Error')
            elif len(v)<60:val.set(s if v in ('0','Error') and s not in ('×','÷','+','%') else v+s)
        for r,row in enumerate([['C','⌫','%','÷'],['7','8','9','×'],['4','5','6','−'],['1','2','3','+'],['0','.','(',')']]):
            for c,s in enumerate(row): self.button(grid,s,lambda x=s:calc('-' if x=='−' else x),bg='white',font=(FONT,14)).grid(row=r,column=c,sticky='nsew',padx=2,pady=2)
        self.button(grid,'=',lambda:calc('='),bg=BLUE,fg='white',font=(FONT,14,'bold')).grid(row=5,column=0,columnspan=4,sticky='nsew',padx=2,pady=2)
        for i in range(4):grid.columnconfigure(i,weight=1)
        for i in range(6):grid.rowconfigure(i,weight=1)
    def terminal(self,b):
        console=tk.Text(b,bg='#142032',fg='#c8e5d8',insertbackground='white',font=('Consolas',11),relief='flat',padx=12,pady=12);console.pack(fill='both',expand=True);console.insert('end','PythonOS Shell [Version 0.1]\nType help for available commands.\n\n');console.config(state='disabled')
        row=tk.Frame(b,bg='#142032');row.pack(fill='x');tk.Label(row,text='PS> ',bg='#142032',fg='#8ee1be',font=('Consolas',11)).pack(side='left',padx=(10,0));entry=tk.Entry(row,bg='#142032',fg='white',insertbackground='white',relief='flat',font=('Consolas',11));entry.pack(side='left',fill='x',expand=True,ipady=9)
        def run(e):
            cmd=entry.get().strip();entry.delete(0,'end');console.config(state='normal');console.insert('end','PS> '+cmd+'\n'); parts=cmd.split(maxsplit=1); base=parts[0].lower() if parts else ''; arg=parts[1] if len(parts)>1 else ''
            if base=='clear':console.delete('1.0','end')
            else:
                out={'help':'help, ls, date, whoami, echo, cat, clear, about','ls':'  '.join(self.files['Documents']),'date':datetime.now().isoformat(sep=' ',timespec='seconds'),'whoami':'local-user','echo':arg,'cat':self.files['Documents'].get(arg,'File not found'),'about':'PythonOS v0.1 | Virtual shell, not a host system shell.','':' '}.get(base,'Unknown command. Type help.');console.insert('end',out+'\n\n')
            console.see('end');console.config(state='disabled')
        entry.bind('<Return>',run);entry.focus_set()
    def settings(self,b):
        tk.Label(b,text='System  /  About',bg=PANEL,fg=INK,font=(FONT,20,'bold')).pack(anchor='w',padx=24,pady=(22,12))
        for k,v in [('Device name','PythonOS Virtual Desktop'),('Edition','Developer Preview'),('Version','0.1'),('Runtime','Python + tkinter'),('Storage','Virtual notes on local disk')]:
            row=tk.Frame(b,bg='white');row.pack(fill='x',padx=24,pady=3);tk.Label(row,text=k,bg='white',fg=MUTED,width=15,anchor='w').pack(side='left',padx=12,pady=8);tk.Label(row,text=v,bg='white',fg=INK,anchor='w').pack(side='left',pady=8)
        self.button(b,'Toggle full screen (F11)',lambda:self.root.attributes('-fullscreen',not self.root.attributes('-fullscreen')),bg=BLUE,fg='white').pack(anchor='w',padx=24,pady=10,ipadx=10,ipady=6)

if __name__=='__main__':
    root=tk.Tk(); app=PythonOS(root); root.mainloop()
