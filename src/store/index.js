import { createStore } from 'vuex'
import auth from "@/store/auth";
import sequences from "@/store/sequences";
import references from "@/store/references";
import strains from "@/store/strain";

export default createStore({
    modules: {
        auth,
        sequences,
        references,
        strains
    }
})