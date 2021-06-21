import { createStore } from 'vuex'
import auth from "@/store/auth";
import sequences from "@/store/sequences";
import references from "@/store/references";
import strains from "@/store/strain";
import reports from "@/store/reports";

export default createStore({
    modules: {
        auth,
        sequences,
        references,
        strains,
        reports
    }
})