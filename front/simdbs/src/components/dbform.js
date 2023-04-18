export default function DBForm(props){
    return(
        <>
        <div className="insertdb">
            <div className={props.className}>
                <form className="form">
                    <fieldset className="border">
                        <h1>{props.title}</h1>
                        <label htmlFor="host-a">Database host address:</label><br></br>
                        <input className="input-data" type="text" name="host-a" /><br></br>

                        <label htmlFor="dbname">Database name:</label><br></br>
                        <input className="input-data" type="text" name="dbname" /><br></br>
                    
                        <label htmlFor="dbuser">Username:</label><br></br>
                        <input className="input-data" type="text" name="dbuser" /><br></br>
                        
                        <label htmlFor="dbpass">Password:</label><br></br>
                        <input className="input-data" type="password" name="dbpass" /><br></br>

                        <label htmlFor="table">Table:</label>
                        <select className="input-data" name="dbtable">
                            <option value="">Escolha a tabela</option>
                            <option value="consulta">consulta</option>
                            <option value="medico">medico</option>
                            <option value="paciente">paciente</option>
                        </select>
                    </fieldset>
                </form>
            </div>
        </div>
        </>
    )
}