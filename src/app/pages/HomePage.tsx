import { useState } from 'react';
import { KernelStatus } from '../KernelStatus';
import { SessionPanel } from '../SessionPanel';
import { EduCore } from '../../core/educore';
import type { UserIdentity } from '../../core/identity/identity';
import type { Organization } from '../../core/organization/organization';

const usuarioEjemplo:UserIdentity={uid:'usr-carlos-001',name:'Carlos Chacón',email:'cchacon@colegioeducenter.cl',organization:{id:'org-educenter',name:'Colegio Particular Educenter'},role:{id:'admin',name:'Administrador'},permissions:['planning.view','planning.create','planning.edit','planning.approve','dashboard.view','admin.manage']};
const organizacionEjemplo:Organization={id:'org-educenter',name:'Colegio Particular Educenter',rut:'76.000.000-0',country:'Chile',region:'Valparaíso',commune:'Calle Larga',active:true};
EduCore.organization.setOrganization(organizacionEjemplo);
const savedUser=EduCore.session.load(); if(savedUser){EduCore.identity.setCurrentUser(savedUser)}
export function HomePage(){const [currentUser,setCurrentUser]=useState(EduCore.identity.getCurrentUser());
function startSession(){EduCore.identity.setCurrentUser(usuarioEjemplo);EduCore.session.save(usuarioEjemplo);setCurrentUser(usuarioEjemplo)}
function closeSession(){EduCore.identity.clear();EduCore.session.clear();setCurrentUser(null)}
return <div className="page-stack"><section className="page-heading"><div><span className="eyebrow">Inicio</span><h2>Panel general</h2><p>Estado del núcleo y sesión actual.</p></div></section><KernelStatus/><SessionPanel currentUser={currentUser} onStartSession={startSession} onCloseSession={closeSession}/></div>}
