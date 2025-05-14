import { useNavigate } from "@solidjs/router";
import { PresentationButton } from "../../../components/PresentationSchemes/PresentationSchemes";


export default function Dashboard(){

    const navigate = useNavigate();

    return(
        <div>

            <PresentationButton click_func={() => navigate("open", {replace:false})} hintText="" img_src="" label="Open Shop" /> 
            <PresentationButton click_func={() => navigate("", {replace:false} ) } hintText="" img_src="" label="Open Shop" /> 
        
        </div>
    )
}