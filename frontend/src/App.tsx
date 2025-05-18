import { Component, createEffect, lazy} from 'solid-js';
import {createSignal} from 'solid-js';
import {Router, Route, RouteSectionProps, useLocation} from '@solidjs/router';
import { toolConfig } from './toolConfig';


// Change to lazy load eg: const Users = lazy(() => import("./pages/Users"));

import HomePage from './routes/home';
const DS_Tutorial = lazy(() => import('./routes/dynascripter/Tutorial/Tutorial')); 
import Options from './routes/dynascripter/Options/Options';
import MS_Options from './routes/monstruct/options/options';
import SearchScreen from './routes/dynascripter/SearchScreen/SearchScreen';
import ScriptEditor from './routes/dynascripter/ScriptEditor/ScriptEditor';
import MainMenu from './routes/dynascripter/MainMenu/MainMenu';
import DashBoard from './routes/monstruct/dashboard/dashboard';
import Create from './routes/monstruct/create/create';
import Header from './components/Header/Header';
import preloadScriptEditor from './routes/dynascripter/ScriptEditor/editor.data';

// Monstruct
import Edit from './routes/monstruct/edit/edit';
import Learnset_Editor from './routes/monstruct/edit/learnset/learnset';
import Evolution_Editor from './routes/monstruct/edit/evolutions/evolutions';
import Formes_Editor from './routes/monstruct/edit/formes/formes';
import Info_Editor from './routes/monstruct/edit/info/info';
import Compare_Editor from './routes/monstruct/edit/compare/compare';
import HapnEditor from './routes/happen/editor'



// AEscribe(NPC/Story/Dialogue Editor)
import TaleWeaver_Home from './routes/taleweaver/home';

// Tumble (Quest Editor)
import QuestForge_Dashboard from './routes/questforge/dashboard';
import QuestForge_Create from './routes/questforge/create';
import Globlot_Home from './routes/globlot/home';
import BB_Dashboard from './routes/battlebrew/dashboard/dashboard';
import SS_Dashboard from './routes/statstyler/dashboard';
import SK_Dashboard from './routes/shopkeep/dashboard/dashboard';
//import SK_Create from './routes/shopkeep/create/c';
import TypeChart from './routes/statstyler/type-chart/type-chart';
import SK_Open from './routes/shopkeep/open/Open';
import Map_Editor from './routes/globlot/editor/editor';



const App: Component = () => {

  // const [ActiveApp, SetActiveApp] = createSignal("");

  // createEffect(() => {
  //   const location = useLocation();
  //   const firstSegment = location.pathname.split('/')[1];
  //   if (firstSegment in toolConfig) {
  //     SetActiveApp(firstSegment);
  //   }
  // });

  

  const PageWrapper = (props: RouteSectionProps<unknown>) => {
    return (
      <>
        <Header/>
  
        <main>
          <div class='content-container'>
            {props.children}
          </div>
        </main>
      </>
  
    )
  
  }

  return (
    <div>
        <Router root={PageWrapper}>

            <Route path="/" component={HomePage} />

            
            <Route path="dynascripter">

              <Route path="/" component={MainMenu}/>

              <Route path="/manual" component={DS_Tutorial}/>
              <Route path="/options" component={Options}/>
              <Route path="/search" component={SearchScreen}/>
              <Route path="/editor" component={ScriptEditor} preload={preloadScriptEditor} />

            </Route>

            <Route path="monstruct">

              <Route path="/" component={DashBoard} />
          
              <Route path="create" component={Create}/>

              <Route path="edit" >
                <Route path="/" component={Edit}/>
                
                <Route path="learnset" component={Learnset_Editor}/>
                <Route path="evolutions" component={Evolution_Editor}/>
                <Route path="formes" component={Formes_Editor}/>
                <Route path="info" component={Info_Editor}/>
                <Route path="compare" component={Compare_Editor}/>

              </Route>

              <Route path="community" />

              <Route path="profile" />

              <Route path="options" component={MS_Options} />

            </Route>


            <Route path="taleweaver">

              <Route path="/" component={TaleWeaver_Home}/>

            </Route>
            
            <Route path="questforge">

              <Route path="/" component={QuestForge_Dashboard}/>
              <Route path="create" component={QuestForge_Create}/>

            </Route>
            
            {/* Socket IO Dependency must be replaced by websockets */}
            {/* <Route path="globlot" component={()=>{
              createEffect(()=>{SetActiveApp("globlot")})
              return(
                <div class='content-container'>
                  <Outlet/>
                </div>
              )
            }}>

              <Route path="/" component={Globlot_Home()}/>
              <Route path="editor" component={Map_Editor()}/>


            </Route> */}

            <Route path="happen">

              <Route path="/" component={HapnEditor}/>
            
            </Route>
            
            <Route path="battlebrew">

              <Route path="/" component={BB_Dashboard}/>

            </Route>

            <Route path="statstyler">

              <Route path="/" component={SS_Dashboard}/>
              <Route path="type_chart" component={TypeChart} />
            </Route>
            
            <Route path="shopkeep" >

              <Route path="/" component={SK_Dashboard}/>
              <Route path="open" component={SK_Open} />
            </Route>

          <Route path="*" component={()=>{return(<h1>Not Found... and that's not OK</h1>)}}/>
        </Router>
    </div>
  );
};

export default App;
