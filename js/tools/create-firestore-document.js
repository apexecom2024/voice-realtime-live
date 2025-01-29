import { Logger } from '../utils/logger.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBe9a58zaQCrBSGeWwcIVa_PnZABoH6zV4",
  authDomain: "tudds-ccd0wn.firebaseapp.com",
  databaseURL: "https://tudds-ccd0wn-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tudds-ccd0wn",
  storageBucket: "tudds-ccd0wn.appspot.com",
  messagingSenderId: "786974954352",
  appId: "1:786974954352:web:696d4fce818f14659bb5b5",
  measurementId: "G-CEQL4E8CW3"
};


export class CreateFirestoreDocumentTool {
    constructor() {
         // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
    }


    getDeclaration() {
        return [{
            name: "create_firestore_document",
            description: "This tool creates a new document in the 'scribe_documents' Firestore collection using voice input.",
            parameters: {
                type: "object",
                properties: {
                   text: {
                        type: "string",
                        description: "The text extracted from voice input, containing all the document details."
                    }
                },
                required: ["text"]
            }
        }];
    }

    async execute(args) {
       try {
            Logger.info('Executing CreateFirestoreDocumentTool', args);

            const { text } = args;

            // Regex extraction, this needs to be improved to handle more complex cases
            const ageMatch = text.match(/age is (\d+)/i);
            const assignedMedicalPractitionerMatch = text.match(/practitioner is ([\w\s.]+)/i);
            const bloodPressureMatch = text.match(/blood pressure is ([\d\/]+)/i);
            const bmiMatch = text.match(/bmi is (\d+)/i);
            const cardiovascularMatch = text.match(/cardiovascular is ([\w\s.]+)/i);
            const chiefComplaintMatch = text.match(/chief complaint is ([\w\s.,]+)/i);
            const conductedOnMatch = text.match(/conducted on ([\d-]+)/i);
            const dateMatch = text.match(/date is ([\d-]+)/i);
            const differentialDiagnosisMatch = text.match(/differential diagnosis is ([\w\s.,]+)/i);
            const educationMatch = text.match(/education is ([\w\s.,]+)/i);
            const eentMatch = text.match(/eent is ([\w\s.]+)/i);
            const familyHistoryMatch = text.match(/family history is ([\w\s.]+)/i);
            const followUpMatch = text.match(/follow up is ([\w\s.]+)/i);
            const genderMatch = text.match(/gender is (\w+)/i);
            const generalAppearanceMatch = text.match(/general appearance is ([\w\s.]+)/i);
            const generalObservationsMatch = text.match(/general observations is ([\w\s.]+)/i);
            const heightMatch = text.match(/height is (\d+)/i);
            const historyOfIllnessMatch = text.match(/history of illness is ([\w\s.,]+)/i);
            const integumentMatch = text.match(/integument is ([\w\s.]+)/i);
            const labResultsMatch = text.match(/lab results are ([\w\s.]+)/i);
            const locationMatch = text.match(/location is ([\w\s.]+)/i);
            const pastMedicalHistoryMatch = text.match(/past medical history is ([\w\s.,]+)/i);
            const patientNameMatch = text.match(/patient name is ([\w\s.]+)/i);
            const printedNameMatch = text.match(/printed name is ([\w\s.]+)/i);
            const raceMatch = text.match(/race is ([\w\s.]+)/i);
            const respiratoryMatch = text.match(/respiratory is ([\w\s.]+)/i);
            const reviewOfSystemsMatch = text.match(/review of systems is ([\w\s.,]+)/i);
            const socialHistoryMatch = text.match(/social history is ([\w\s.,]+)/i);
            const temperatureMatch = text.match(/temperature is ([\d.]+)/i);
            const titleMatch = text.match(/title is ([\w\s]+)/i);
            const treatmentPlanMatch = text.match(/treatment plan is ([\w\s.]+)/i);
            const weightMatch = text.match(/weight is (\d+)/i);
            

            const docData = {
                age: ageMatch ? ageMatch[1] : null,
                assignedMedicalPractitioner: assignedMedicalPractitionerMatch ? assignedMedicalPractitionerMatch[1] : null,
                bloodPressure: bloodPressureMatch ? bloodPressureMatch[1] : null,
                bmi: bmiMatch ? bmiMatch[1] : null,
                cardiovascular: cardiovascularMatch ? cardiovascularMatch[1] : null,
                chiefComplaint: chiefComplaintMatch ? chiefComplaintMatch[1] : null,
                 conductedOn: conductedOnMatch ? conductedOnMatch[1] : null,
                created_at: serverTimestamp(),
                date: dateMatch ? dateMatch[1] : null,
                differentialDiagnosis: differentialDiagnosisMatch ? differentialDiagnosisMatch[1] : null,
                education: educationMatch ? educationMatch[1] : null,
                eent: eentMatch ? eentMatch[1] : null,
                familyHistory: familyHistoryMatch ? familyHistoryMatch[1] : null,
                followUp: followUpMatch ? followUpMatch[1] : null,
                gender: genderMatch ? genderMatch[1] : null,
                generalAppearance: generalAppearanceMatch ? generalAppearanceMatch[1] : null,
                generalObservations: generalObservationsMatch ? generalObservationsMatch[1] : null,
                height: heightMatch ? heightMatch[1] : null,
                historyOfIllness: historyOfIllnessMatch ? historyOfIllnessMatch[1] : null,
                 integument: integumentMatch ? integumentMatch[1] : null,
                 labResults: labResultsMatch ? labResultsMatch[1] : null,
                location: locationMatch ? locationMatch[1] : null,
                pastMedicalHistory: pastMedicalHistoryMatch ? pastMedicalHistoryMatch[1] : null,
                patientName: patientNameMatch ? patientNameMatch[1] : null,
                 printedName: printedNameMatch ? printedNameMatch[1] : null,
                race: raceMatch ? raceMatch[1] : null,
                respiratory: respiratoryMatch ? respiratoryMatch[1] : null,
                reviewOfSystems: reviewOfSystemsMatch ? reviewOfSystemsMatch[1] : null,
                 socialHistory: socialHistoryMatch ? socialHistoryMatch[1] : null,
                temperature: temperatureMatch ? temperatureMatch[1] : null,
                title: titleMatch ? titleMatch[1] : null,
                treatmentPlan: treatmentPlanMatch ? treatmentPlanMatch[1] : null,
                weight: weightMatch ? weightMatch[1] : null
            };


            const docRef = await addDoc(collection(this.db, "scribe_documents"), docData);
           
             Logger.info('Document written with ID: ', docRef.id);

             return `Document created with ID: ${docRef.id}`;
        } catch (error) {
           Logger.error('CreateFirestoreDocumentTool failed', error);
            throw error;
        }
    }
}
