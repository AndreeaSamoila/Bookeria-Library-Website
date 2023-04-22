import {Route, Routes} from "react-router-dom";
import * as Pages from "../pages";
import AuthLayout from "../layouts/AuthLayout";
import {AppLayout} from "../layouts/AppLayout";

export default function() {
    return( 
    <Routes>
        <Route element={<AppLayout />}>
        <Route path="/" element={<Pages.Home />}/>
            <Route path="/manage" element={<Pages.ManageBooks />} />
            <Route path="/book/:id" element={<Pages.Book />} />
        </Route>
        <Route element={<AuthLayout />}>
            <Route path="/login"  element={<Pages.Login />}/>
            <Route path="/register" element={<Pages.Register />}/>
        </Route>
    </Routes>
    );
}