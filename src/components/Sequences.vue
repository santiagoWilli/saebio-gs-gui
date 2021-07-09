<template>
    <div>
        <div
            v-if="uploadSequenceMessage"
            class="text-center mb-2"
            :class="uploadSequenceError ? 'text-danger' : 'text-success'"
        >{{ uploadSequenceMessage }}</div>
        <div class="d-flex justify-content-between">
            <SequenceUpload />
            <div class="d-flex">
                <div>
                    <label for="date-type">Fecha de</label>
                    <select id="date-type" v-model="dateField" class="mx-1" @change="updateSequences">
                        <option :value="null">secuencia</option>
                        <option value="upload">subida</option>
                    </select>
                </div>
                <div>
                    <label for="strain">Mes</label>
                    <select id="month" v-model="month" class="mx-1" @change="updateSequences">
                        <option
                            v-for="n in 12"
                            :key="`month${n}`"
                            :value="n"
                        >{{ n }}</option>
                    </select>
                </div>
                <div>
                    <label for="strain">Año</label>
                    <select id="year" v-model="year" class="mx-1" @change="updateSequences">
                        <option
                            v-for="n in currentYear()"
                            :key="`year${n}`"
                            :value="yearFrom(n)"
                        >{{ yearFrom(n) }}</option>
                    </select>
                </div>
                <div>
                    <label for="strain">Género y especie</label>
                    <select id="strain" v-model="strainId" class="mx-1">
                        <option :value="null">Todas</option>
                        <option
                            v-for="strain in strainsFilter"
                            :key="strain._id.$oid"
                            :value="strain._id.$oid"
                        >{{ strain.name }}</option>
                    </select>
                </div>
            </div>
        </div>
        <Table :headers="headers">
            <tr
                v-for="sequence in sequences"
                :key="getId(sequence)"
                @click="goToSequenceWithId(getId(sequence))"
                @mouseover="hoveredTr = getId(sequence)"
                @mouseleave="hoveredTr = null"
                :class="{ 'table-secondary cursor-pointer': hovered === getId(sequence) }"
            >
                <td><i>{{ strain(sequence) }}</i> <span>{{ sequence.code }}</span></td>
                <td>{{ originalName(sequence) }}</td>
                <td>{{ date(sequence) }}</td>
                <td>{{ uploadDate(sequence) }}</td>
                <td>{{ sequence.trimmedPair ? 'Sí' : 'No' }}</td>
            </tr>
        </Table>
    </div>
</template>

<script>
import Table from "@/components/Table";
import Utils from "@/Utils";
import SequenceUpload from "@/components/SequenceUpload";
import {mapGetters} from "vuex";

export default {
    name: 'Sequences',
    components: {SequenceUpload, Table},
    data() {
        return {
            headers: ['Cepa', 'Nombre original', 'Fecha de la secuencia', 'Fecha de subida', 'Trimmed'],
            hoveredTr: null,
            strainId: null,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            dateField: null
        }
    },
    computed: {
        sequences() {
            if (this.strainId == null) return this.$store.getters.sequences
            return this.$store.getters.sequences.filter(s => s.strain.$oid === this.strainId)
        },
        strains() {
            return this.$store.getters.indexedStrains
        },
        strainsFilter() {
            return this.$store.getters.strains
        },
        hovered() {
            return this.hoveredTr
        },
        ...mapGetters(['uploadSequenceError']),
        ...mapGetters(['uploadSequenceMessage'])
    },
    methods: {
        originalName(sequence) {
            const filename = sequence.originalFilenames[0].split('_')
            return `${filename[0]}_${filename[1]}`
        },
        goToSequenceWithId(id) {
            this.$router.push({
                name: 'Sequence',
                params: { id }
            })
        },
        getId(sequence) {
            return Utils.getId(sequence)
        },
        date(sequence) {
            const date = new Date(sequence.sequenceDate)
            return date.toLocaleDateString();
        },
        uploadDate(sequence) {
            const date = new Date(sequence.uploadDate)
            return date.toLocaleDateString();
        },
        strain(sequence) {
            return this.strains[sequence.strain.$oid] ? this.strains[sequence.strain.$oid].name : ""
        },
        currentYear() {
            return parseInt(new Date().getFullYear().toString().substring(2,4))
        },
        yearFrom(n) {
            if (n.toString().length === 1) return `200${n}`
            return n.toString().length === 2 ? `20${n}` : `2${n}`
        },
        updateSequences() {
            let params = this.dateField == null ?
                { year: this.year, month: this.month } :
                { year: this.year, month: this.month, field: 'uploadDate' }
            this.$store.dispatch('getSequences', params)
                .then(r => {
                    if (!r) {
                        this.$store.dispatch('logout')
                        this.$router.push('/login')
                    }
                })
        }
    },
    mounted() {
        this.updateSequences()
        this.$store.dispatch('getIndexedStrains')
        this.$store.dispatch('getStrains')
    }
}
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
