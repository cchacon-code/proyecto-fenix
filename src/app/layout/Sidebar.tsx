import { NavLink } from 'react-router-dom';
const navigation=[
  {to:'/inicio',label:'Inicio',icon:'⌂'},
  {to:'/personas',label:'Personas',icon:'👥'},
  {to:'/cursos',label:'Cursos',icon:'🎓'},
  {to:'/organizacion',label:'Organización',icon:'🏫'},
];
export function Sidebar(){return <aside className="sidebar"><div className="brand"><div className="brand-mark">F</div><div><strong>EduSuite AI</strong><small>Proyecto Fénix</small></div></div><nav className="sidebar-nav">{navigation.map(item=><NavLink key={item.to} to={item.to} className={({isActive})=>isActive?'nav-link nav-link-active':'nav-link'}><span>{item.icon}</span>{item.label}</NavLink>)}</nav><footer className="sidebar-footer"><small>Kernel EduCore activo</small></footer></aside>}
