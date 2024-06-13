import app from './app';
import configaration from './configaration';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(configaration.database_url as string);
    app.listen(configaration.port, () => {
      console.log(`App listening on port ${configaration.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
