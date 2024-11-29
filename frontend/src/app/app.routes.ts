import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
    { path: '', component: StudentListComponent },
    { path: 'add-student', component: AddStudentComponent },
    { path: 'edit-student/:id', component: EditStudentComponent },
    { path: 'chat', component: ChatComponent },
];
