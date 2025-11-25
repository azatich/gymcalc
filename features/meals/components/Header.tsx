import React from "react";

const Header = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl mb-2">
        Добавить прием пищи
      </h1>
      <p className="text-muted-foreground">
        Выберите из библиотеки или введите данные вручную
      </p>
    </div>
  );
};

export default Header;
