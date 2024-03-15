export const environment = {
  production: true,
  // This is the CSA api address
  localDevBase: 'http://localhost:52060/api/',
  BaseURL: 'https://improveapit.acgov.org/api/csa',
  authToken:
  'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQVkFMU2VydmVyIiwiYXVkIjoicHZhbHNlcnZpY2V1c2VyIn0.Vnm2fPOVySUKWACcXglRKiuCSsREmeg8yDyK5tUdXxo',
   
  // Instead of working out an Angular page, use iFrame to display this aspx page instead, it will display selected report
  reportViewer:
    'https://ssrspbi.acgov.org/ReportServer/Pages/ReportViewer.aspx',
  // This is where all IMPROVE report are located in Dev environment
  reportUrl: 'Prod/IMPROVE/',
  currentEnvironment: 'Prod',
};
