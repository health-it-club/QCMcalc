export default function TypeOfCorrection() {
  return (
    <div className="flex flex-col items-center my-6">
      <label htmlFor="typeOfCorrection" className="text-lg font-bold mt-4 mb-2">
        Type de Correction
      </label>
      <select
        required
        name="typeOfCorrection"
        id="typeOfCorrection"
        className="w-full p-4 text-lg bg-light rounded-full text-center text-dark
        appearance-none 
        [-moz-appearance:textfield] 
        [&::-webkit-inner-spin-button]:appearance-none 
        [&::-webkit-outer-spin-button]:appearance-none
        px-3 
        py-2 
        border-solid
        border-4 
        border-light-200
        focus:outline-none 
        focus:border-blue">
        <option value="QCSs">QCS(Question à choix simple)</option>
        <option value="allOrNothing">QCM Tout ou Rien</option>
        <option value="partiallyNegative">QCM Partielle</option>
        <option value="partiallyPositive">QCM Système Américain</option>
      </select>
    </div>
  );
}
