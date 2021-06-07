import { createStore } from 'vuex'
import auth from "@/store/auth";
import sequences from "@/store/sequences";

export default createStore({
    modules: {
        auth,
        sequences
    }
})