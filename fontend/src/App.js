import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AdoptionManage from "./pages/adoption/AdoptionManage.js";
import AdoptionView from "./pages/adoption/AdoptionView.js";
import AnimalManage from "./pages/animal/AnimalManage.js";
import AnimalAdd from "./pages/animal/AnimalAdd.js";
import AnimalEdit from "./pages/animal/AnimalEdit.js";
import EventManage from "./pages/event/EventManage.js";
import EventAdd from "./pages/event/EventAdd.js";
import EventEdit from "./pages/event/EventEdit.js";
import VolunteerManage from "./pages/volunteer/VolunteerManage.js";
import VolunteerAdd from "./pages/volunteer/VolunteerAdd.js";
import VolunteerEdit from "./pages/volunteer/VolunteerEdit.js";
import EventView from "./pages/event/EventView.js";
import AnimalView from "./pages/animal/AnimalView.js";
import Animal from "./pages/common/Animal.js";
import AdoptAnimal from "./pages/common/AdoptAnimal.js";
import AppointmentManage from "./pages/appointment/AppointmentManage.js";
import Login from "./pages/Login.js";
import { useUser } from "./contexts/UserContext.js";
import Home from "./pages/Home.js";
import Event from "./pages/common/Event.js";
import VaccinationManage from "./pages/vaccination/VaccinationManage.js";
import Volunteer from "./pages/common/Volunteer.js";
import SignUp from "./pages/SignUp.js";
import FundManage from "./pages/fund/FundManage.js";
import Profile from "./pages/Profile.js";
import ProfileDoctor from "./pages/ProfileDoctor.js";
import ProfileShelter from "./pages/ProfileShelter.js";

function App() {

  const { user } = useUser();

  return (
    <div className="grid-container min-h-[100vh] bg-gray-200">
      <Router>
        <Header />
        <div className="pt-10">
          <Routes>

            <Route exact path="/" element={<Home />} />

            {(user == null || user?.role === 'USER') && (
              <>
                <Route exact path="/animal" element={<Animal />} />
                <Route exact path="/event" element={<Event />} />
                <Route exact path="/volunteer" element={<Volunteer />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
              </>
            )}

            {user?.role === 'USER' && (
              <>
                <Route exact path="/animal/:id/adopt" element={<AdoptAnimal />} />
                <Route exact path="/profile" element={<Profile />} />
              </>
            )}

            {user?.role === 'SHELTER_OWNER' && (
              <>
                <Route exact path="/admin/animal/manage" element={<AnimalManage />} />
                <Route exact path="/admin/animal/add" element={<AnimalAdd />} />
                <Route exact path="/admin/animal/edit/:id" element={<AnimalEdit />} />
                <Route exact path="/admin/animal/view/:id" element={<AnimalView />} />

                <Route exact path="/admin/adoption/manage" element={<AdoptionManage />} />
                <Route exact path="/admin/adoption/view/:id" element={<AdoptionView />} />

                <Route exact path="/admin/volunteer/manage" element={<VolunteerManage />} />
                <Route exact path="/admin/volunteer/add" element={<VolunteerAdd />} />
                <Route exact path="/admin/volunteer/edit/:id" element={<VolunteerEdit />} />

                <Route exact path="/profile" element={<ProfileShelter />} />
              </>
            )}

            {user?.role === 'EVENT_MANAGER' && (
              <>
                <Route exact path="/admin/event/manage" element={<EventManage />} />
                <Route exact path="/admin/event/add" element={<EventAdd />} />
                <Route exact path="/admin/event/edit/:id" element={<EventEdit />} />
                <Route exact path="/admin/event/view/:id" element={<EventView />} />

                <Route exact path="/admin/event-fund/manage" element={<FundManage />} />



              </>
            )}

            {user?.role === 'DOCTOR' && (
              <>
                <Route exact path="/admin/vaccination/manage" element={<VaccinationManage />} />
                <Route exact path="/admin/appointment/manage" element={<AppointmentManage />} />
                <Route exact path="/profile" element={<ProfileDoctor />} />
              </>
            )}





            {/* <Route exact path="/admin/volunteer-respond/manage" element={<VolunteerRespondManage />} /> */}
            {/* <Route exact path="/admin/volunteer-respond/view/:id" element={<VolunteerRespondView />} /> */}

            {/* <Route exact path="/admin/event-fund/view/:id" element={<EventFundView />} /> */}
            {/* <Route exact path="/admin/event-fund/add" element={<EventFundAdd />} /> */}
            {/* <Route exact path="/admin/event-fund/edit/:id" element={<EventFundEdit />} /> */}
            {/* <Route exact path="/admin/appointment/view/:id" element={<AppointmentView />} /> */}
            {/* <Route exact path="/admin/appointment/add" element={<AppointmentAdd />} /> */}
            {/* <Route exact path="/admin/appointment/edit/:id" element={<AppointmentEdit />} /> */}
          </Routes >
        </div>
      </Router>
    </div>
  );
}

export default App;
