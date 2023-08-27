The re-use plan was developed by considering core project functionality, identifying critical features and then selecting appropriate technologies based on these requirements. 

The component diagram has been utilised to form the basis of the re-use plan. It was identified that several key components are suitable as Library / Framework as shown in Component Re-use Plan. This information was then utilised to guide the selection of suitable components, as shown in Application Re-use Plan. The below tables justify the reasons for using a library / framework and further justify the selection of a particular library/framework.

# Component Re-Use Plan
| Component           | Plan                   | Justification                                                                                                                                                                                         |
|---------------------|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Route Manager       | Utilise Framework      | Routing is always a core requirement for any web application. Frameworks offer this functionality.                                                                                                   |
| Request Handler     | Utilise Framework      | Request handling is always a core requirement for any web application. Frameworks offer this functionality.                                                                                          |
| Database Service    | Utilise Library        | Connecting to a database or storage of information is a very common use case. Libraries maintained by the database supplier exist.                                                                      |
| Graph Library       | Utilise Library        | Displaying information as graphs is a common task. Multiple libraries with standard sets of graphs and functionality exist.                                                                            |
| View                | Utilise Framework      | Generating views is a common requirement for web-based applications. This task is widely supported by frameworks.                                                                                    |
| Front End Library   | Utilise Library        | Rendering components for webpages is a standard practice. Libraries exist with default sets of components that can be adjusted.                                                                      |
| State Manager       | Utilise Library        | State management is a common requirement for browser-based applications. Multiple libraries exist to support state for front-end applications.                                                       |
| Database            | Utilise Database       | Storing information is a very common requirement. Databases are widely supported and utilized for long-term storage.                                                                                 |
| Controller          | Utilise Framework      | Utilizing controllers is a well-understood design pattern. This task is widely supported by frameworks.                                                                                              |


# Application Re-Use Plan
| Components                                           | Chosen Technology    | Discussion/Reasoning                                                                                                                                                                                                                                                                   | Alternative Considered                | Popularity       |
|------------------------------------------------------|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|------------------|
| JavaScript Library for Building User Interfaces      | React                | React is a popular and widely adopted JavaScript library that offers numerous benefits, making it a valuable skill for future job opportunities. It is very convenient for us to create an interactive user interface with React.                                                  | Vue                                  | Very High: 184k stars |
| Web-application Framework                            | Next.js              | Selecting Next.js accelerates web development with built-in SSR, routing, and automatic code splitting, enhancing both user experience and SEO.                                                                                                                                           | Gatsby                               | Very High: 75.9k stars |
| Front-end Development Language                      | TypeScript           | It can enhance code robustness and maintainability.                                                                                                                                                                                                                                     | JavaScript                           | Very High: 80.3k stars |
| CSS Preprocessor                                    | SCSS                 | Choosing SCSS for styling enhances code maintainability and modularity through its powerful features like variables, nesting, and mixins.                                                                                                                                                 | Less                                 | High: 14.7k stars    |
| Package Manager                                     | pnpm                 | Its performance surpasses that of npm and yarn.                                                                                                                                                                                                                                          | npm, yarn                            | High: 16.2k stars    |
| Graphing Library                                    | ECharts              | Selecting ECharts enables visually appealing and interactive data visualization for effective communication of insights.                                                                                                                                                                    | D3.js, amCharts, Plotly              | Very High: 50.6k stars |
| Javascript Environment                              | Node.js              | Node.js is chosen for its efficient, event-driven architecture, enabling high-performance server-side applications and unified JavaScript programming.                                                                                                                                        | Deno                                 | Very High: 97.3k stars |
| Basic UI Component Library                          | Ant Design (Antd)    | While offering ready-to-use components, Ant Design also allows easy customization to match your specific project's branding and design requirements.                                                                                                                                     | Material UI, Plain CSS               | Very High: 86.8k stars |
| Database                                            | MySQL                | MySQL is optimized for fast read and write operations, making it well-suited for high-traffic applications and real-time data processing.                                                                                                                                                  | SQLite, IBM Db2, MongoDB             | Very High         |
| Java Object-Relational Mapping Framework            | MyBatis              | The tool to manipulate the database.                                                                                                                                                                                                                                                    | Hibernate, Apache Cayenne            | Very High         |
| Security framework                                  | Spring Security      | Spring Security offers robust and customizable security features seamlessly integrated with Spring applications, making it a trusted choice for implementing authentication, authorization, and protection mechanisms.                                                                   | Keycloak, Apache Shiro               | High: 14.1k stars  |
| Backend Framework                                   | Spring Boot          | This is the framework used to build the back-end server.                                                                                                                                                                                                                                 | Spark                                | Very High: 44.7k stars |


# Third party referencing and encapsulation
**Front End**
- **Basic UI component:**
  - Ant Design:
    - Basic Input
    - Form
    - Notification
    - Button
    - Calendar
    - Spin
    - Card
    - Table
- **Chart component:**
  - Echart
  - Smoothed Line Chart
  - Line Race

**Back End:**
- Authentication & Authorization Service
- Business Logic Service
- Data Access Service
- Caching Service
- Message Queue Service
- External Systems Integration Service
- Logging & Monitoring Service
