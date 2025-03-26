export default function NumbreOfQuestions() {
  return (
    <div className="flex flex-col items-center my-6 w-full">
      <label htmlFor="numOfQuestions" className="text-lg font-bold mt-4 mb-2">
        Nombre total de questions dans le sujet
      </label>
      <input
        type="number"
        min="1"
        max={200}
        step={1}
        required
        name="numOfQuestions"
        id="numOfQuestions"
        placeholder=""
        inputMode="numeric"
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
          focus:border-blue"
      />
    </div>
  );
}
