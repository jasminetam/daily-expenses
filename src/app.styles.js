export const appStyle = styled.p`
.containerWrapper {
    background-image: linear-gradient(
        to right,
        rgb(85, 93, 201),
        rgb(231, 198, 241)
      );
}

.container {
  height: 100vh;
  width: 100vw;
}

.titleName {
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(255, 255, 255);
}

.header {
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.headerButtonsDiv {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
}

.cardBody {
  background-color: white;
  display: grid;
  padding: 30px;
  margin: 10px;
}

.cardTitle {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  font-weight: normal;
}

.cardButtonsDiv {
  margin-top: 1.5rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.cardButtons,
.headerButtons {
  cursor: pointer;
  color: #ffffff;
  border-color: #0d6efd;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  background-color: #649cef;
}

.cardButtons :hover,
.headerButtons :hover{
    color:#0d6efd;
}
`