// eslint-disable-next-line no-use-before-define
import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { FormInstance } from "antd/lib/form";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  id: string;
  score1: number;
  score2: number;
  score3: number;
  score4: number;
  gpa: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  id: string;
  score1: number;
  score2: number;
  score3: number;
  score4: number;
  gpa: number;
}

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export default class EditableTable extends React.Component<
  EditableTableProps,
  EditableTableState
> {
  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = [
      {
        title: "STT",
        dataIndex: "key",
      },
      {
        title: "Họ tên",
        dataIndex: "name",
        width: "30%",
      },
      {
        title: "Mã sinh viên",
        dataIndex: "id",
      },
      {
        title: "Điểm kiểm tra 1",
        dataIndex: "score1",
        editable: true,
      },
      {
        title: "Điểm kiểm tra 2",
        dataIndex: "score2",
        editable: true,
      },
      {
        title: "Điểm kiểm tra 3",
        dataIndex: "score3",
        editable: true,
      },
      {
        title: "Điểm kiểm tra 4",
        dataIndex: "score4",
        editable: true,
      },
      {
        title: "Điểm trung bình",
        dataIndex: "gpa",
        editable: true,
      },
      {
        title: "action",
        dataIndex: "operation",
        // render: (_, record: any) =>
        //   this.state.dataSource.length >= 1 ? (
        //     <Popconfirm
        //       title="Sure to delete?"
        //       onConfirm={() => this.handleSend(record.key)}
        //     >
        //       <a>Gửi</a>
        //     </Popconfirm>
        //   ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          id: "MSV1232021",
          score1: 0,
          score2: 0,
          score3: 0,
          score4: 0,
          gpa: 0,
        },
        {
          key: "1",
          name: "Edward King 1",
          id: "MSV1232021",
          score1: 0,
          score2: 0,
          score3: 0,
          score4: 0,
          gpa: 0,
        },
        {
          key: "2",
          name: "Edward King 1",
          id: "MSV1232021",
          score1: 0,
          score2: 0,
          score3: 0,
          score4: 0,
          gpa: 0,
        },
        {
          key: "3",
          name: "Edward King 1",
          id: "MSV1232021",
          score1: 0,
          score2: 0,
          score3: 0,
          score4: 0,
          gpa: 0,
        },
      ],
      // eslint-disable-next-line react/no-unused-state
      count: 4,
    };
  }

  handleSend = (key: React.Key) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleSave = (row: DataType) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    );
  }
}
