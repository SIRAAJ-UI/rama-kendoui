export const environment = {
  production: false,
  // This is the CSA api address
  withoutAPI: true,
  localDevBase: 'http://localhost:52060/api',
  BaseURL: 'https://improveapid.acgov.org/api/csa',
  authToken:
  //'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQVkFMU2VydmVyIiwiYXVkIjoicHZhbHNlcnZpY2V1c2VyIn0.Vnm2fPOVySUKWACcXglRKiuCSsREmeg8yDyK5tUdXxo',
  'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQVkFMU2VydmVyIiwiYXVkIjoicHZhbHNlcnZpY2V1c2VyIn0.Vnm2fPOVySUKWACcXglRKiuCSsREmeg8yDyK5tUdXxo',

  // Instead of working out an Angular page, use iFrame to display this aspx page instead, it will display selected report
  reportViewer:
    'https://ssrspbid.acgov.org/ReportServer/Pages/ReportViewer.aspx',
  // This is where all IMPROVE report are located in Dev environment
  reportUrl: 'Development/IMPROVE/',
  currentEnvironment: 'Dev',
};
