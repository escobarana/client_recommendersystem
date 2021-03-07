export class PatientForm{
    constructor(public form_date: Date,
                public email: String,
                public age: Number,
                public gender: String,
                public os: String,
                public answers: [] ){ }
}